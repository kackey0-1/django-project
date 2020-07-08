from django.http import Http404
from django.db.models import Q
from projects.models import Project
from app.enums.status import ProjectStatus
from django.core.exceptions import FieldDoesNotExist

import datetime
import logging

logger = logging.getLogger()


def search(keyword):
    if keyword:
        queryset = Project.objects.filter(
            Q(deleted_at=None)
            & (Q(name__icontains=keyword)
               | Q(description__icontains=keyword)
               )
        )
    else:
        queryset = Project.objects.all().filter(Q(deleted_at=None))[:100]
    return queryset


def get_project(project_id):
    project = Project.objects.filter(Q(id=project_id) & Q(deleted_at=None)).first()
    if not project:
        raise Http404("Project Id={} Not Found".format(project_id))
    return project


def _set_modifier(targetModel, user_id):
    """
        作成/更新 timestamp id
    """
    now = datetime.datetime.now()
    # idが存在するなら
    if not targetModel.id:
        targetModel.created_id = user_id
        targetModel.created_at = now
    # update_idが存在するなら
    try:
        targetModel.updated_id = user_id
        targetModel.updated_at = now
    except FieldDoesNotExist:
        pass


def save_project(form, user):
    """ 
        案件作成/更新
        保存する前に一旦取り出す
    """
    project = form.save(commit=False)
    _set_modifier(project, user.id)
    project.client_id = user.client_id
    project.status = ProjectStatus.OPEN.value
    project.save()
    form.save_m2m()
    return project


def delete_project(project, user_id):
    """
        案件削除 
    """
    now = datetime.datetime.now()
    project.status = ProjectStatus.CANCELED.value
    project.deleted_at = now
    project.deleted_id = user_id
    project.save()


def ordered_project(project_id, user_id):
    project = get_project(project_id)
    _set_modifier(project, user_id)
    project.status = ProjectStatus.CLOSED.value
    project.save()
