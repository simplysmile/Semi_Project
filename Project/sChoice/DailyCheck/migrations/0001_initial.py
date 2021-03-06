# Generated by Django 4.0.4 on 2022-06-15 06:07

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('AdminPage', '0001_initial'),
        ('Member', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyMeal',
            fields=[
                ('d_No', models.AutoField(primary_key=True, serialize=False)),
                ('d_meal_date', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('d_meal_time', models.CharField(choices=[('B', '아침'), ('L', '점심'), ('D', '저녁'), ('S', '간식')], max_length=10, null=True)),
                ('d_food', models.CharField(blank=True, max_length=100)),
                ('d_food_name', models.CharField(blank=True, max_length=100)),
                ('d_por', models.IntegerField(blank=True, default=0)),
                ('d_carb', models.FloatField(blank=True, default=0)),
                ('d_protein', models.FloatField(blank=True, default=0)),
                ('d_fat', models.FloatField(blank=True, default=0)),
                ('d_kcal', models.IntegerField(blank=True, default=0)),
                ('d_img', models.ImageField(blank=True, upload_to='')),
                ('d_member', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Member.members')),
            ],
        ),
        migrations.CreateModel(
            name='Dailyexercise',
            fields=[
                ('ex_No', models.AutoField(primary_key=True, serialize=False)),
                ('ex_time', models.IntegerField(blank=True, default=0)),
                ('burned_kcal', models.IntegerField(blank=True, default=0)),
                ('goal_kcal', models.IntegerField(blank=True, default=1000)),
                ('content', models.TextField(blank=True)),
                ('createdate', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('exercise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AdminPage.exercise')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Member.members')),
            ],
        ),
    ]
