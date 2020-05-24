from django.db import models

""" Project Table """
class Project(models.Model):

    class Meta(object):
        db_table = 'projects'

    name          = models.CharField(verbose_name='案件名', max_length=255)
    description   = models.CharField(verbose_name='案件詳細', max_length=255)
    skills        = models.ManyToManyField('engineers.Skill', blank=True, verbose_name='資格')
    location      = models.CharField(verbose_name='現場', max_length=255)
    project_start = models.DateTimeField(verbose_name='案件開始日')
    project_end   = models.DateTimeField(verbose_name='案件開始日')
    client        = models.ForeignKey('projects.Client', models.DO_NOTHING, null=True, blank=True, verbose_name='顧客')
    partners      = models.ManyToManyField('engineers.Partner', blank=True, verbose_name='取引先')
    engineers     = models.ManyToManyField('accounts.CustomUser', blank=True, verbose_name='技術者')
    created_at    = models.DateTimeField(verbose_name='作成日付')
    created       = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Project_created', verbose_name='作成者')
    updated_at    = models.DateTimeField(null=True, blank=True, verbose_name='更新日付')
    updated       = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Project_updated', verbose_name='更新者')
    deleted_at    = models.DateTimeField(null=True, blank=True, verbose_name='削除日付')
    deleted       = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Project_deleted', verbose_name='更新者')

    def __str__(self):
        return self.name

""" Client Table """
class Client(models.Model):
    class Meta(object):
        db_table = 'clients'
    
    name       = models.CharField(max_length=255)
    url        = models.CharField(max_length=255, null=True)
    email      = models.CharField(max_length=255, null=True)
    tel        = models.CharField(max_length=11, null=True)
    postcode   = models.CharField(max_length=7, null=True)
    state      = models.CharField(max_length=20, null=True)
    city       = models.CharField(max_length=20, null=True)
    street     = models.CharField(max_length=255, null=True)
    building   = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField()
    created    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Client_created')
    updated_at = models.DateTimeField(null=True)
    updated    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Client_updated')
    deleted_at = models.DateTimeField(null=True)
    deleted    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Client_deleted')

    def __str__(self):
        return self.name

class Choice(models.Model):
    code       = models.IntegerField()
    level      = models.IntegerField()
    label      = models.CharField(max_length=255)
    value      = models.IntegerField()
    sort_order = models.IntegerField()
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'choices'
        unique_together = (('code', 'level', 'value'),)
    
    def __str__(self):
        return ",".join(str(self.code), str(self.level), self.value)
