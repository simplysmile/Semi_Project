# Generated by Django 4.0.4 on 2022-06-09 06:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('AdminPage', '0001_initial'),
        ('Member', '0006_alter_members_createdate_alter_members_modidate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dailyexercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ex_time', models.IntegerField(blank=True, default=0)),
                ('burned_kcal', models.IntegerField(blank=True, default=0)),
                ('goal_kcal', models.IntegerField(blank=True, default=1000)),
                ('content', models.TextField(blank=True)),
                ('createdate', models.DateTimeField(auto_now_add=True)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='AdminPage.exercise')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Member.members')),
            ],
        ),
    ]