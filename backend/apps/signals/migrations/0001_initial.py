# Generated by Django 4.2.13 on 2024-06-28 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Signals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=50)),
                ('meaning', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Signals',
                'verbose_name_plural': 'Signalss',
            },
        ),
    ]