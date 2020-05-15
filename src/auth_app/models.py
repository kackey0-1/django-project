from django.db import models

# Create your models here.

""" Employee_groupsテーブル（社員グループ）"""
class Employee_groups(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null=True)
    auth_application = models.IntegerField(default=0, null=False)
    sales_application = models.IntegerField(default=0, null=False)
    clients_application = models.IntegerField(default=0, null=False)
    constructions_application = models.IntegerField(default=0, null=False)
    partner_companies_application = models.IntegerField(default=0, null=False)
    accounting_application = models.IntegerField(default=0, null=False)
    merchandise_order_application = models.IntegerField(default=0, null=False)
    status = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "employee_groups"

""" Usersテーブル（ユーザー）"""
class Users(models.Model):
    employee_group = models.ForeignKey(Employee_groups, on_delete=models.SET_NULL, null=True, verbose_name='社員グループID')
    code = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    kana = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    tel = models.CharField(max_length=13, null=True)
    password = models.CharField(max_length=255)
    address_state_id = models.IntegerField()
    city = models.CharField(max_length=255, null=True)
    street = models.CharField(max_length=255, null=True)
    building = models.CharField(max_length=255, null=True)
    department = models.CharField(max_length=255, null=True)
    occupation = models.CharField(max_length=255, null=True)
    position = models.CharField(max_length=255, null=True)
    emergency_contact_name = models.CharField(max_length=255, null=True)
    relationship = models.CharField(max_length=255, null=True)
    emergency_contact_address = models.CharField(max_length=255, null=True)
    emergency_contact_tel = models.CharField(max_length=13, null=True)
    emergency_contact_email = models.CharField(max_length=255, null=True)
    qualification = models.CharField(max_length=255, null=True)
    qualification_acquisition_date = models.DateField(blank=True,null=True)
    qualification_type = models.IntegerField(null=True)
    qualification_remarks = models.CharField(max_length=255, null=True)
    remarks = models.CharField(max_length=255, null=True)
    status = models.IntegerField(default=0)
    updated_user_name = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "users"
    #XXX: ModelChoiceで利用しているので、変更するとModelFormへ波及する
    def __str__(self):
        return self.name

""" 地域マスタテーブル """
class Address_regions(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "address_regions"

""" 都道府県マスタテーブル """
class Address_states(models.Model):
    address_region_id = models.IntegerField(null=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "address_states"
