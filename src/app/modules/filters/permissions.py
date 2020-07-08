from django import template
from app.enums.status import ProjectStatus

register = template.Library()


@register.filter(name='has_group')
def has_group(user, group_name):
    # https://stackoverflow.com/questions/34571880/how-to-check-in-template-if-user-belongs-to-a-group
    return user.groups.filter(name=group_name).exists()


@register.filter(name='is_open')
def is_open(project):
    # https://stackoverflow.com/questions/34571880/how-to-check-in-template-if-user-belongs-to-a-group
    return project.status == ProjectStatus.OPEN.value
