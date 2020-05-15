from decimal import Decimal, ROUND_DOWN
import datetime
import calendar
from dateutil.relativedelta import relativedelta
from django.conf import settings

import logging

logger = logging.getLogger(__name__)

# Decimal(11,0)へcast
def decimal11(value):
    return Decimal(value).quantize(Decimal('10000000000'))

# Decimal(5,2)へcast
def decimal52(value):
    return Decimal(value).quantize(Decimal('100.00'))


"""
利益率を算出ロジック(小数点以下切り捨て)
total: 売上
profit: 利益
"""
def calcTax(total):
    return Decimal(total * Decimal(settings.TAX_RATE)).quantize(Decimal('1.'), rounding=ROUND_DOWN)


"""
利益率を算出ロジック(小数点第三位以下切り捨て)
total: 売上
profit: 利益
"""
def calc_profit_rate(profit, total):
    return (Decimal(profit) / Decimal(total) * Decimal('100')).quantize(Decimal('.00'), rounding=ROUND_DOWN)


""" 締日確認(末日の場合、対象月の末日を返す) """
def check_closing_date(target_date, closing_date):
    if closing_date == '0':
        closing_date = calendar.monthrange(
            target_date.year, target_date.month)[1]
        logger.debug("closing_date: " + str(closing_date))
    return int(closing_date)


""" 支払い予定日算出ロジック(小数点第三位以下切り捨て)
start_date: 支払い予定日算出開始日(発注日・請求書発行日) 文字列("%Y-%m-%d")
closing_date: 締日
days: 支払いサイト日数
return: 支払予定日(datetime型)
"""
def calc_payment_date(start_date, closing_date, days):
    target_date = datetime.datetime.strptime(str(start_date), "%Y-%m-%d")
    closing_date = check_closing_date(target_date, closing_date)

    if target_date < datetime.datetime(target_date.year, target_date.month, closing_date):
        # 対象日付が同一月の締日より以前の場合: 対象日付の月の締日 + 支払いサイト日数
        payment_date = datetime.datetime(
            target_date.year, target_date.month, closing_date) + datetime.timedelta(days=int(days))
    else:
        # 対象日付が同一月の締日より以降の場合: 対象日付の次月の締日 + 支払いサイト日数
        payment_date = datetime.datetime(target_date.year, target_date.month, closing_date) + \
            relativedelta(months=1) + datetime.timedelta(days=int(days))
    return payment_date
