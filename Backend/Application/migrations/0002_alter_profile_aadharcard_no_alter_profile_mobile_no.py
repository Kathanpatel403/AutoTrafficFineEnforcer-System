# Generated by Django 4.1.13 on 2024-06-23 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Application', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='aadharcard_no',
            field=models.CharField(max_length=12),
        ),
        migrations.AlterField(
            model_name='profile',
            name='mobile_no',
            field=models.CharField(max_length=15),
        ),
    ]
