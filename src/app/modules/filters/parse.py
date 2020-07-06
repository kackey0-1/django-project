from django import template
register = template.Library()

@register.filter(name='str')
def to_str(s):
    return str(s)

@register.filter(name='int')
def to_int(s):
    return int(s)