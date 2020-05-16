import logging

import stripe
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import View

logger = logging.getLogger(__name__)

from .models import Project
from .forms import RegisterForm

# Create your views here.
class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        queryset = Project.objects.all()
        keyword = request.GET.get('keyword')
        if keyword:
            queryset = queryset.filter(
                Q(test_name__icontains=keyword) | Q(test_description__icontains=keyword)
            )
        context = {
            'keyword': keyword,
            'test_list': queryset,
        }
        return render(request, 'projects/test_list.html', context)
index = IndexView.as_view()

class RegisterView(View):
    def get(self, request, *args, **kwargs):
        context = {
            'form': RegisterForm(),
        }
        return render(request, 'projects/test_register.html', context)

    def post(self, request, *args, **kwargs):
        logger.info("You're in post!!!")

        # リクエストからフォームを作成
        form = RegisterForm(request.POST)
        # バリデーション
        if not form.is_valid():
            # バリデーションNGの場合はアカウント登録画面のテンプレートを再表示
            return render(request, 'projects/test_register.html', {'form': form})

        # 保存する前に一旦取り出す
        project = form.save(commit=False)
        # # パスワードをハッシュ化してセット
        # user.set_password(form.cleaned_data['password'])
        # # ユーザーオブジェクトを保存
        project.save()

        return redirect("projects:index")
register = RegisterView.as_view()
