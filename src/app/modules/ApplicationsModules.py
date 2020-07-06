from django.http import Http404
from django.db.models import Q
from projects.models import Application
from app.modules import ProjectsModules as p
from app.enums.status import ApplicationStatus


def get_application(project_id, user_id):
    application = Application.objects.filter(Q(project_id=project_id) & Q(engineer_id=user_id)).first()
    return application


def get_applications(project_id):
    applications = Application.objects.filter(Q(project_id=project_id))
    return applications


def apply_project(project_id, user):
    """
        案件申請
    """
    project = p.get_project(project_id)
    application = get_application(project_id, user.id)
    if application is None:
        application = Application(status=ApplicationStatus.APPLY.value, project=project, engineer=user)
        application.save()


def cancel_project(project_id, user):
    """
        案件申請辞退
    """
    project = p.get_project(project_id)
    application = get_application(project_id, user.id)
    if application:
        application.delete()
