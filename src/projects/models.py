from django.db import models


class Project(models.Model):
    """テスト"""

    class Meta(object):
        db_table = 'projects'

    test_name = models.CharField(verbose_name='テスト名', max_length=255)
    test_description = models.CharField(verbose_name='テスト名', max_length=255)
    test_count = models.PositiveIntegerField(verbose_name='テスト名', null=True, blank=True, default=0)

    def __str__(self):
        return self.name
