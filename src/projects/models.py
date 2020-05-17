from django.db import models

""" Project Table """
class Project(models.Model):

    class Meta(object):
        db_table = 'projects'

    name = models.CharField(verbose_name='案件名', max_length=255)
    description = models.CharField(verbose_name='案件詳細', max_length=255)
    required_skill = models.CharField(verbose_name='資格', max_length=255)
    client = models.ForeignKey('projects.Client', models.DO_NOTHING)
    created_at = models.DateTimeField()
    created = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Project_created')
    updated_at = models.DateTimeField(null=True)
    updated = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Project_updated')
    deleted_at = models.DateTimeField(null=True)
    deleted = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Project_deleted')

    def __str__(self):
        return self.name

""" Client Table """
class Client(models.Model):
    class Meta(object):
        db_table = 'clients'
    
    # code = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=255, null=True)
    tel = models.CharField(max_length=13, null=True)
    fax = models.CharField(max_length=13, null=True)
    company_email = models.CharField(max_length=255, null=True)
    postcode = models.CharField(max_length=8, null=True)
    address_state_id = models.IntegerField()
    city = models.CharField(max_length=20, null=True)
    street = models.CharField(max_length=255, null=True)
    building = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField()
    created = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, related_name='Client_created')
    updated_at = models.DateTimeField(null=True)
    updated = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Client_updated')
    deleted_at = models.DateTimeField(null=True)
    deleted = models.ForeignKey('accounts.CustomUser', models.DO_NOTHING, null=True, blank=True, related_name='Client_deleted')

    def __str__(self):
        return self.name

class Choice(models.Model):
    code = models.IntegerField()
    level = models.IntegerField()
    label = models.CharField(max_length=255)
    value = models.IntegerField()
    sort_order = models.IntegerField()
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'choices'
        unique_together = (('code', 'level', 'value'),)
    
    def __str__(self):
        return ",".join(str(self.code), str(self.level), self.value)
