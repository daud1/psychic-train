# Generated by Django 4.0.3 on 2022-03-06 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("materials", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="materialunitprice",
            old_name="unit_Px_ugx",
            new_name="amount_ugx",
        ),
        migrations.AlterField(
            model_name="materialunitprice",
            name="material",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, related_name="unit_px", to="materials.material"
            ),
        ),
    ]
