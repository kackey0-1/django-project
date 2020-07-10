from django.http import Http404
from django.db.models import Q
from projects.models import Application
from app.modules import ProjectsModules as p
from app.enums.status import ApplicationStatus
from app.modules.CommonUtils import divide_list

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
    application = get_application(project_id, user.id)
    if application is None:
        application = Application(status=ApplicationStatus.APPLY.value, project_id=project_id, engineer=user)
        application.save()


def cancel_project(project_id, user):
    """
        案件申請辞退
    """
    application = get_application(project_id, user.id)
    if application:
        application.delete()


def ordered_application(project_id, engineer_ids):
    """
        案件発注
    """
    # SQL in区制約回避のためリストを分割
    divided_list = divide_list(engineer_ids)
    for ids in divided_list:
        Application.objects.filter(Q(project_id=project_id)
                                   & Q(engineer_id__in=ids))\
            .update(status=ApplicationStatus.ORDERED.value)
    # 受注できなかった申請については NOT_ORDER にて更新
    Application.objects.filter(Q(project_id=project_id)
                               & Q(status__in=[ApplicationStatus.APPLY_APPROVED.value,
                                               ApplicationStatus.APPLY.value])) \
        .update(status=ApplicationStatus.NOT_ORDERED.value)
