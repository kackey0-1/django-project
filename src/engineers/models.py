from django.db import models
from accounts.models import CustomUser

""" Partners Table """
class Partner(models.Model):
    class Meta(object):
        db_table = 'partners'
    
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
    created    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Partner_created')
    updated_at = models.DateTimeField(null=True)
    updated    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Partner_updated')
    deleted_at = models.DateTimeField(null=True)
    deleted    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Partner_deleted')

    def __str__(self):
        return self.name

""" Skills Table """
class Skill(models.Model):
    class Meta(object):
        db_table = 'skills'
    
    name       = models.CharField(max_length=255)
    created_at = models.DateTimeField(verbose_name='作成日付')
    created    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Skill_created', verbose_name='作成者')
    updated_at = models.DateTimeField(null=True, verbose_name='更新日付')
    updated    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Skill_updated', verbose_name='更新者')
    deleted_at = models.DateTimeField(null=True, verbose_name='削除日付')
    deleted    = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Skill_deleted', verbose_name='更新者')

    def __str__(self):
        return "Skill: "+self.name
