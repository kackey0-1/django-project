from django import template
import math

register = template.Library()


@register.filter(name='has_group')
def has_group(user, group_name):
    # https://stackoverflow.com/questions/34571880/how-to-check-in-template-if-user-belongs-to-a-group
    return user.groups.filter(name=group_name).exists()
