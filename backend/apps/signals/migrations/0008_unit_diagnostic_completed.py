# Generated by Django 4.2.13 on 2024-07-07 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signals', '0007_lessons_ico_ulesson_ico'),
    ]

    operations = [
        migrations.AddField(
            model_name='unit',
            name='diagnostic_completed',
            field=models.BooleanField(default=False),
        ),
    ]