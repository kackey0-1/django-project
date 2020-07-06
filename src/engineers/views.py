import logging
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View
from app.modules import EngineersModules as e

from .forms.register_form import EntryForm

logger = logging.getLogger(__name__)


class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        # keyword = request.GET.get('keyword')
        queryset = e.search(None)
        context = {
            # 'keyword': keyword,
            'engineer_list': queryset,
        }
        return render(request, 'engineers/engineer_list.html', context)


class PutView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {
            'form': EntryForm(),
        }
        return render(request, 'engineers/engineer_detail.html', context)

    def post(self, request, *args, **kwargs):
        # リクエストからフォームを作成
        if request.POST['id']:
            # 更新処理の場合
            engineer = e.getEngineer(request.POST['id'])
            form = EntryForm(request.POST, instance=engineer)
        else:
            # 新規処理の場合
            form = EntryForm(request.POST)
        # バリデーション:バリデーションNGの場合 エンジニア登録画面のテンプレートを再表示
        if not form.is_valid():
            return render(request, 'engineers/engineer_detail.html', {'form': form})
        e.save_user(form, request.user.client_id)
        return redirect('engineers:index')


class DetailView(LoginRequiredMixin, View):
    def get(self, request, user_id, *args, **kwargs):
        engineer = e.getEngineer(user_id)
        form = EntryForm(None, instance=engineer)
        context = {
            'form': form,
        }
        return render(request, 'engineers/engineer_detail.html', context)


index = IndexView.as_view()
put = PutView.as_view()
detail = DetailView.as_view()
