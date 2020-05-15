from django.forms import ValidationError
import logging
logger = logging.getLogger(__name__)


# ACII相当で最大半角文字数以下かのチェック
# 文字数以下でなければFalse
def check_half_width_length(max_half_length, target_str):
    count = _count_halfwidth_char(target_str)
    return count <= max_half_length

# 半角をUS-ASCIIと定義、それ以外は全角と定義
# UTF-8でのbyteサイズチェック、1 byteならUS-ASCII、2 bytes以上はそれ以外なので全角扱い
# 半角を1,全角を2としてカウントアップ
def _count_halfwidth_char(target_str):
    count = 0
    for ch in target_str:
        bytes_len = len(ch.encode('utf-8'))
        bytes_len = 2 if bytes_len > 1 else 1
        count = count + bytes_len
    return count

def clean_half_width_length(form, field_name, target_str):
    # max_lengthを半角最大値として扱う
    half_width_max_length = form.fields[field_name].max_length
    full_width_max_length = half_width_max_length / 2
    if not check_half_width_length(half_width_max_length, target_str):
        error_msg = (
            '全角%d文字相当、半角%d文字相当以内で入力してください。' % (
            full_width_max_length, half_width_max_length))
        raise ValidationError(error_msg)

