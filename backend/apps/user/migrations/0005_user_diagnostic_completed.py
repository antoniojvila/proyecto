# Generated by Django 4.2.13 on 2024-07-08 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_user_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='diagnostic_completed',
            field=models.BooleanField(default=False),
        ),
    ]
