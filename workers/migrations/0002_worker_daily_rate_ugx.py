# Generated by Django 4.0.3 on 2022-03-10 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='daily_rate_ugx',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
