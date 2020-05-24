import logging

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from app.modules import EngineersModules as e

from .forms.register_form import RegisterForm

logger = logging.getLogger(__name__)

# Create your views here.
class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        # keyword = request.GET.get('keyword')
        queryset = e.search(None)
        context = {
            # 'keyword': keyword,
            'engineer_list': queryset,
        }
        return render(request, 'engineers/engineer_list.html', context)
index = IndexView.as_view()

class PutView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {
            'form': RegisterForm(),
        }
        return render(request, 'engineers/engineer_detail.html', context)

    def post(self, request, *args, **kwargs):
        # リクエストからフォームを作成
        if request.POST['id']:
            # 更新処理の場合
            engineer = e.getEngineer(request.POST['id'])
            form = RegisterForm(request.POST, instance=engineer)
        else:
            # 新規処理の場合
            form = RegisterForm(request.POST)
        # バリデーション:バリデーションNGの場合 エンジニア登録画面のテンプレートを再表示
        if not form.is_valid():
            return render(request, 'engineers/engineer_detail.html', {'form': form})

        e.save_user(form, request.user.client_id)
        return redirect('engineers:index')
put = PutView.as_view()

class DetailView(LoginRequiredMixin, View):
    def get(self, request, user_id, *args, **kwargs):
        engineer = e.getEngineer(user_id)
        form = RegisterForm(None, instance=engineer)
        context = {
            'form': form,
        }
        return render(request, 'engineers/engineer_detail.html', context)
detail = DetailView.as_view()
