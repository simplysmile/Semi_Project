# Generated by Django 4.0.4 on 2022-06-09 06:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Member', '0004_alter_members_createdate_alter_members_modidate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='createdate',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 6, 9, 15, 43, 46, 674526)),
        ),
        migrations.AlterField(
            model_name='members',
            name='modidate',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 6, 9, 15, 43, 46, 674526)),
        ),
    ]
