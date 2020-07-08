import logging

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.generic import View
from django.db import transaction

from projects.forms import EntryForm, EditForm
from app.modules import ProjectsModules as p
from app.modules import ApplicationsModules as a
from app.modules.ChoiceModules import get_choice_list, ChoiceCode

logger = logging.getLogger(__name__)


class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        keyword = request.GET.get('keyword')
        queryset = p.search(keyword)
        context = {
            'keyword': keyword,
            'projects': queryset,
        }
        return render(request, 'projects/project_list.html', context)


class CreateView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        skills = get_choice_list(code=ChoiceCode.SKILL)
        context = {
            'form': EntryForm(),
            'skills': skills,
        }
        return render(request, 'projects/project_create.html', context)

    def post(self, request, *args, **kwargs):
        user = request.user
        # リクエストからフォームを作成
        form = EntryForm(request.POST)
        # バリデーション
        if not form.is_valid():
            # バリデーションNGの場合:登録画面のテンプレートを再表示
            return render(request, 'projects/project_create.html', {'form': form})
        # project 保存
        project = p.save_project(form, user)
        return redirect("projects:detail", project.id)


class DetailView(LoginRequiredMixin, View):
    def get(self, request, project_id, *args, **kwargs):
        project = p.get_project(project_id)
        applications = a.get_applications(project_id)
        context = {
            'project': project,
            'applications': applications
        }
        return render(request, 'projects/project_detail.html', context)

    def post(self, request, project_id, *args, **kwargs):
        project = p.get_project(project_id)
        p.delete_project(project, request.user.id)
        return redirect('projects:index')


class EditView(LoginRequiredMixin, View):
    def get(self, request, project_id, *args, **kwargs):
        project = p.get_project(project_id)
        context = {
            'form': EditForm(instance=project)
        }
        return render(request, 'projects/project_edit.html', context)

    def post(self, request, project_id, *args, **kwargs):
        user = request.user
        project = p.get_project(project_id)
        # リクエストからフォームを作成
        form = EditForm(request.POST, instance=project)
        if not form.is_valid():
            # バリデーションNGの場合:登録画面のテンプレートを再表示
            return render(request, 'projects/project_edit.html', {'form': form})
        # project 保存
        project = p.save_project(form, user)
        return redirect("projects:index")


index = IndexView.as_view()
create = CreateView.as_view()
detail = DetailView.as_view()
edit = EditView.as_view()


@login_required
def apply(request, project_id):
    user = request.user
    a.apply_project(project_id, user)
    return redirect("projects:detail", project_id)


@login_required
def approve(request):
    user_id = request.user.id
    project_id = request.POST.get('project_id')
    engineer_ids = request.POST.getlist('engineers')
    with transaction.atomic:
        a.ordered_application(project_id, engineer_ids)
        p.ordered_project(project_id, user_id)
    return redirect("projects:detail", project_id)


@login_required
def ordered(request):
    user_id = request.user.id
    project_id = request.POST.get('project_id')
    engineer_ids = request.POST.getlist('engineers')
    with transaction.atomic():
        a.ordered_application(project_id, engineer_ids)
        p.ordered_project(project_id, user_id)
    return redirect("projects:detail", project_id)


@login_required
def cancel(request, project_id):
    user = request.user
    a.cancel_project(project_id, user)
    return redirect("projects:detail", project_id)
