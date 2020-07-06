from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """拡張ユーザーモデル"""

    class Meta(object):
        db_table = 'custom_user'

    # 標準フィールド(AbstractUser)
    # https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#fields
    # カスタムフィールド
    tel = models.CharField(max_length=11)
    login_count = models.IntegerField(verbose_name='ログイン回数', default=0)
    client = models.ForeignKey('projects.Client', models.DO_NOTHING, null=True, blank=True)
    partner = models.ForeignKey('engineers.Partner', models.DO_NOTHING, null=True, blank=True)
    skills = models.ManyToManyField('engineers.Skill', blank=True, verbose_name='資格')
    description = models.TextField(verbose_name='詳細', max_length=2000)

    def post_login(self):
        """ログイン後処理"""
        # ログイン回数を増やす
        self.login_count += 1
        self.save()

    def required_group(self, group_name):
        return self.groups.filter(name=group_name).exists()

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
