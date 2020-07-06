from django.db import Error, connection
from projects.models import Choice
from enum import Enum
import datetime
import logging
from django import template
from django.core.cache import cache

logger = logging.getLogger()

"""ChoiceCode用filter"""
register = template.Library()


@register.filter(name='choice_label')
def code_to_label(value, target):
    # Enum値指定
    if isinstance(target, int):
        targetCode = ChoiceCode(target)
    # Enum名指定
    else:
        targetCode = ChoiceCode[target]
    label = get_choice_label(targetCode, value)
    return label if label else value


class ChoiceCode(Enum):
    # 申請ステータス
    APPLICATION_STATUS = 1
    # スキル
    SKILL = 2


def get_choice_list(code, level=1, with_cache=True):
    """get choices tuple list"""
    # Type checking
    if not isinstance(code, ChoiceCode):
        raise TypeError('code must be an instance of ChoiceCode Enum')
    # Cache処理
    cache_key = 'choiceslist_' + str(code.value) + '_' + str(level)
    choices = None
    # get from cache
    if with_cache:
        choices = cache.get(cache_key)
    if not choices:
        # get list from db
        choices = _get_choices_list(code, level)
        # set to cache
        if with_cache:
            cache.set(cache_key, choices)
    logger.debug(choices)
    return choices


def _get_choices_list(code, level=1):
    # Type checking
    if not isinstance(code, ChoiceCode):
        raise TypeError('code must be an instance of ChoiceCode Enum')
    qs = Choice.objects.filter(code=code.value, level=level, deleted_at=None).order_by('sort_order')
    # convert to tuple list
    choiceList = []
    # XXX: 重要なチェック、何故かこれを入れないと依存性が解決できずmigrationが通らない
    # 参考: Django MySQL Error (1146, "Table 'db_name.django_content_type' doesn't exist") - Stack Overflow)
    # https://stackoverflow.com/questions/46675285/django-mysql-error-1146-table-db-name-django-content-type-doesnt-exist#comment80307306_46675285
    if 'choices' in connection.introspection.table_names():
        choiceList = [(q.value, q.label) for q in qs]
    logger.debug(choiceList)
    return choiceList


def get_choice_label(code, value, level=1, with_cache=False):
    """get choice label by value"""
    choices = get_choice_list(code, level, with_cache)
    for c in choices:
        if value == c[0]:
            return c[1]
    # 存在しない場合
    return None
