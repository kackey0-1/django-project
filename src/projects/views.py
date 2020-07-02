import logging

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
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


class CreateView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {
            'form': EntryForm(),
        }
        return render(request, 'projects/project_create.html', context)

    def post(self, request, *args, **kwargs):
        user = request.user
        user_id = user.id
        client_id = user.client_id
        # リクエストからフォームを作成
        form = EntryForm(request.POST)
        # バリデーション
        if not form.is_valid():
            # バリデーションNGの場合:登録画面のテンプレートを再表示
            return render(request, 'projects/project_create.html', {'form': form})
        # project 保存
        project = p.save_project(form, user_id, client_id)
        return redirect("projects:index")


detail = CreateView.as_view()


class DetailView(LoginRequiredMixin, View):
    def get(self, request, project_id, *args, **kwargs):
        project = p.getProject(project_id)
        context = {
            'project': project
        }
        return render(request, 'projects/project_detail.html', context)

    def post(self, request, *args, **kwargs):
        project = p.getProject(request.POST['id'])
        p.delete_project(project, request.user.id)
        return redirect("projects:index")


detail = DetailView.as_view()


@login_required
def apply(request):
    user_id = request.POST['user_id']
    project_id = request.POST['project_id']
    p.apply_project(project_id, user_id)
    return redirect("projects:index")
