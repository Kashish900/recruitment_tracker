# Generated by Django 5.0.6 on 2024-06-22 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobmanagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobposting',
            name='visibility_status',
            field=models.BooleanField(),
        ),
    ]
