# Generated by Django 4.0.3 on 2022-03-13 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0002_worker_daily_rate_ugx'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerattendancelog',
            name='date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
