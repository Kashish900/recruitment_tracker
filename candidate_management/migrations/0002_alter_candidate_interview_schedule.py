# Generated by Django 5.0.6 on 2024-06-22 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidate_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='interview_schedule',
            field=models.JSONField(blank=True, null=True),
        ),
    ]