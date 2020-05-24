import logging

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import View

logger = logging.getLogger(__name__)

from projects.models import Project
from projects.forms import EntryForm
from app.modules import ProjectsModules as p

# Create your views here.
class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        keyword = request.GET.get('keyword')
        queryset = p.search(keyword)
        context = {
            'keyword': keyword,
            'project_list': queryset,
        }
        return render(request, 'projects/project_list.html', context)
index = IndexView.as_view()

class PutView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {
            'form': EntryForm(),
        }
        return render(request, 'projects/project_detail.html', context)

    def post(self, request, *args, **kwargs):
        logger.info("You're in post!!!")
        user_id = request.user.id
        client_id = request.user.client_id
        # リクエストからフォームを作成
        if request.POST['id']:
            # 更新処理の場合
            project = p.getProject(request.POST['id'])
            form = EntryForm(request.POST, instance=project)
        else:
            # 新規処理の場合
            form = EntryForm(request.POST)
        # バリデーション
        if not form.is_valid():
            # バリデーションNGの場合:登録画面のテンプレートを再表示
            return render(request, 'projects/project_detail.html', {'form': form})
        # proejct 保存
        project = p.save_project(form, user_id, client_id)
        return redirect("projects:index")
put = PutView.as_view()

class DetailView(LoginRequiredMixin, View):
    def get(self, request, project_id, *args, **kwargs):
        project = p.getProject(project_id)
        form = EntryForm(instance=project)
        logger.info(form)
        context = {
            'form': form
        }
        return render(request, 'projects/project_detail.html', context)

    def post(self, request, *args, **kwargs):
        project = p.getProject(request.POST['id'])
        p.delete_project(project, request.user.id)
        return redirect("projects:index")
detail = DetailView.as_view()
