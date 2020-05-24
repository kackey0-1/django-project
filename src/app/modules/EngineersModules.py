from django.conf import settings
from django.http import Http404
from django.db.models import Q
from accounts.models import CustomUser
from django.core.exceptions import FieldDoesNotExist
import datetime

import logging
logger = logging.getLogger()

""" 検索機能 """
def search(keyword):
    if keyword:
        queryset = CustomUser.objects.filter(
            Q(deleted_at=None)
            & (Q(name__icontains=keyword)
                | Q(description__icontains=keyword)
            )
        )
    else:
        queryset = CustomUser.objects.all().filter(
            Q(is_active=True)
            & Q(partner__isnull=False)
        )[:100]
    return queryset

def getEngineer(user_id):
    engineer = CustomUser.objects.filter(Q(id=user_id) & Q(is_active=True)).first()
    if not engineer:
        raise Http404("Project Id={} Not Found".format(user_id))
    return engineer

# """ 案件作成/更新 """
def save_user(form, partner_id):
    # 保存する前に一旦取り出す
    user = form.save(commit=False)
    # パスワードをハッシュ化してセット
    user.set_password(form.cleaned_data['password'])
    # ユーザーオブジェクトを保存
    user.partner_id = partner_id
    user.save()
    form.save_m2m()

# """ 案件削除 """
# def delete_project(project, user_id):
#     now = datetime.datetime.now()
#     project.deleted_at = now
#     project.deleted_id = user_id
#     project.save()
