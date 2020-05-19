from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.signals import user_logged_in


class CustomUser(AbstractUser):
    """拡張ユーザーモデル"""

    class Meta(object):
        db_table = 'custom_user'
    
    # 標準フィールド
    # https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#fields
    # カスタムフィールド
    login_count = models.IntegerField(verbose_name='ログイン回数', default=0)
    client = models.ForeignKey('projects.Client', models.DO_NOTHING)

    def post_login(self):
        """ログイン後処理"""
        # ログイン回数を増やす
        self.login_count += 1
        self.save()


# def update_login_count(sender, user, **kwargs):
#     """
#     A signal receiver which updates the last_login date for
#     the user logging in.
#     """
#     user.login_count += 1
#     user.save(update_fields=['login_count'])
#
#
# user_logged_in.connect(update_login_count)