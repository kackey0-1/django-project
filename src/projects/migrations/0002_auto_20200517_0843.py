# Generated by Django 2.2.12 on 2020-05-16 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='url',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
