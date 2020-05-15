from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.exceptions import PermissionDenied
from ..forms import LoginForm, RegisterForm
from ..models import Users, Employee_groups
from hashlib import sha1
import datetime
import json
from datetime import datetime

import logging
logger = logging.getLogger()

# Restrict Decorator
def restrict(func):
    return _restrict(func, isJson=False)

# Restrict Decorator For Json
def restrict_json(func):
    return _restrict(func, isJson=True)

def _restrict(func, isJson=False):
    def wrap_and_call(*args, **kwargs):
        for arg in args:
            # check request object
            if(isinstance(arg,HttpRequest)):
                request = arg
        # check login
        currentUserData = getCurrentUser(request)
        if currentUserData is None:
            return redirect('/auth/login')
        # check permission
        group_data = checkPermission(request)
        # for json request
        if isJson:
            group_data = json.dumps(group_data, default=expireEncoder)
            currentUserData = json.dumps(currentUserData, default=expireEncoder)
        # add dataContext param
        kwargs['data'] = {
                'groupdata': group_data,
                'UserData': currentUserData
                }
        # Call View
        return func(*args, **kwargs)
    return wrap_and_call

def getCurrentUser(request):
    userData = None
    if 'user_id' in request.session:
        userId = request.session['user_id']
        #TODO: 取得できない時にNoneを入れるように
        userData = Users.objects.get(pk=userId)
    return userData


def checkPermission(request):
    group_data = CheckGroupData(request, request.path)
    if not group_data:
        raise PermissionDenied
    return group_data

def renderWithMessage(request, path, data):
    processMessage(request, data)
    return render(request, path, data)

def jsonResponseWithMessage(request, data, status=200):
    processMessage(request, data)
    return JsonResponse(data, status=status)

""" 日付データjson.jumpsにて処理可能な状態に変換 """
def expireEncoder(object):
    if isinstance(object, datetime):
        return object.isoformat()

def processMessage(request, dataContext):
    #XXX: この手法は筋が悪い
    dataContext['alert_message'] = ''
    dataContext['alert_type'] = ''

    # InternalServerError時のメッセージ
    if 'internal_error_flag' in request.session and request.session['internal_error_flag'] == 1:
        dataContext['alert_message'] = '予期せぬエラーが発生しました。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['internal_error_flag'] = 0
        return
    # 削除処理後のメッセージ
    if 'delete_message_flag' in request.session and request.session['delete_message_flag'] == 1:
        dataContext['alert_message'] = '削除しました。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['delete_message_flag'] = 0
        return
    # コピー処理の際に工事台帳にない工事番号をしてした際のエラー
    if 'not_found_copy_flag' in request.session and request.session['not_found_copy_flag'] ==1:
        dataContext['alert_message'] = '存在しない工事台帳であるため、コピーできません。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_copy_flag'] = 0
        return
    # コピー処理後のメッセージ
    if  'copy_message_flag' in request.session and request.session['copy_message_flag'] == 1:
        dataContext['alert_message'] = 'コピーしました。'
        dataContext['alert_type'] = 'alert-info'
        request.session['copy_message_flag'] = 0
        return
    # 保存、コピー処理後のメッセージ
    if 'save_message_flag' in request.session and request.session['save_message_flag'] == 1:
        dataContext['alert_message'] = '保存しました。'
        dataContext['alert_type'] = 'alert-info'
        request.session['save_message_flag'] = 0
        return
    # 検索時にNOT FOUNDだった場合のメッセージ
    if 'not_found_invoice_message_flag' in request.session and request.session['not_found_invoice_message_flag'] == 1:
        # 検索結果0件時のメッセージ
        dataContext['alert_message'] = 'お探しの請求書が存在しません。検索内容を調整の上、再度検索してください。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_invoice_message_flag'] = 0
        return
    if 'not_found_estimation_message_flag' in request.session and request.session['not_found_estimation_message_flag'] == 1:
        # 検索結果0件時のメッセージ
        dataContext['alert_message'] = 'お探しの見積書が存在しません。検索内容を調整の上、再度検索してください。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_estimation_message_flag'] = 0
        return
    if 'not_found_merchandise_order_message_flag' in request.session and request.session['not_found_merchandise_order_message_flag'] == 1:
        # 検索結果0件時のメッセージ
        dataContext['alert_message'] = '検索結果は０件です。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_merchandise_order_message_flag'] = 0
        return
    if 'not_found_outsource_order_message_flag' in request.session and request.session['not_found_outsource_order_message_flag'] == 1:
        # 検索結果0件時のメッセージ
        dataContext['alert_message'] = 'お探しの外注発注書が存在しません。検索内容を調整の上、再度検索してください。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_outsource_order_message_flag'] = 0
        return
    if 'not_found_contract_message_flag' in request.session and request.session['not_found_contract_message_flag'] == 1:
        # 検索結果0件時のメッセージ
        dataContext['alert_message'] = 'お探しの契約書が存在しません。検索内容を調整の上、再度検索してください。'
        dataContext['alert_type'] = 'alert-danger'
        request.session['not_found_contract_message_flag'] = 0
        return

""" 新規登録チェック """
def CreateAdminUser(request, Data):
    # もし、メールアドレスが既に登録されていたらエラーを返す
    if Users.objects.filter(email = Data['email']):
        url = ''
    else:
        # ここで新規登録処理
        now = datetime.datetime.now()
        UserData = Users(
            name = Data['name'],
            kana = Data['kana'],
            email = Data['email'],
            tel = Data['tel'],
            password = sha1(Data['password'].encode('utf-8')).hexdigest(),
            status = 2,
            created_at = now,
            employee_group_id = 1, # 社員グループID
        )
        UserData.save()
        user = Users.objects.all().filter(name = Data['name']).first()
        request.session['user_id'] = user.id
        # 新規登録完了後、顧客一覧画面にリダイレクト？　TODO: 一旦これで、あとで確認 by宮本
        url = '/clients'

    return url

""" ログインチェック """
def Login(request, Data):
    #FIXME: 取得方法が危険
    user = Users.objects.all().filter(email = Data['email'], status__in = [1, 2]).first()
    group_data = Employee_groups.objects.all().filter(id = user.employee_group_id).first()
    #FIXME: SHA1は危険
    password = sha1(Data['password'].encode('utf-8')).hexdigest()
    if user and password == user.password:
        request.session['user_id'] = user.id
        request.session['redirect_flag'] = 0
        request.session['redirect_delete_flag'] = 0
        request.session['redirect_sendmail_flag'] = 0
        request.session['employee_groups_redirect'] = 0

        # 顧客アプリを使えらた、顧客データ一覧にリダイレクト
        # TODO: サイドメニューバー的に、売上管理が一番上なので、売上管理アプリが出来た際は、デフォルトのリダイレクト先を
        # 売上管理アプリの URL に設定する
        if group_data.sales_application:
            url = '/sales'
        elif group_data.clients_application:
            url = '/clients'
        elif group_data.partner_companies_application:
            url = '/partner_companies'
        elif group_data.constructions_application:
            url = '/constructions'
        elif group_data.accounting_application:
            url = '/accounting/user'
    else:
        url = ''

    return url

""" グループがどのメニューを使えるか確認 """
def CheckGroupData(request, url):
    user = Users.objects.all().filter(id = request.session['user_id']).first()
    group_data = Employee_groups.objects.all().filter(id = user.employee_group_id).first()
    # もしグループで使えないアプリにアクセスしようとした場合、404ページにリダイレクトさせる
    if not group_data.sales_application and '/sales/' in url:
        group_data = ''
    elif not group_data.clients_application and '/clients/' in url:
        group_data = ''
    elif not group_data.partner_companies_application and '/partner_companies/' in url:
        group_data = ''
    elif not group_data.constructions_application and '/constructions/' in url:
        group_data = ''
    elif not group_data.accounting_application and '/accounting/' in url:
        group_data = ''

    return group_data
