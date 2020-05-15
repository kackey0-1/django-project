from django import template
import math
register = template.Library()

@register.filter(name='subtract')
def subtract(value, arg):
    return int(value) - int(arg)

@register.filter(name='divide')
def divide(value, arg):
    return math.floor(value / arg)

@register.filter(name='estimates_sum')
def estimates_sum(values):
    total = 0
    for value in values:
        total += value.total_with_tax
    return total

