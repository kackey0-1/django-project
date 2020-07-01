from django.conf import settings
from django.http import Http404
from django.db.models import Q
from projects.models import Project
from app.modules import CustomUserModules
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

def getProject(project_id):
    project = Project.objects.filter(Q(id=project_id) & Q(deleted_at=None)).first()
    if not project:
        raise Http404("Project Id={} Not Found".format(project_id))
    return project

def _set_modifier(targetModel,user_id):
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

def save_project(form, user_id, client_id):
    """ 
        案件作成/更新
        保存する前に一旦取り出す
    """
    
    project = form.save(commit=False)
    _set_modifier(project, user_id)
    project.client_id = client_id
    project.save()
    form.save_m2m()

def delete_project(project, user_id):
    """
        案件削除 
    """
    now = datetime.datetime.now()
    project.deleted_at = now
    project.deleted_id = user_id
    project.save()


def apply_project(project_id, user_id):
    """
        案件申請
    """
    project = getProject(project_id)
    user = CustomUserModules.getUser(user_id)
    project.engineers.add(user)
    project.save()
