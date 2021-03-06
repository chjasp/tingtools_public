# Generated by Django 3.1.7 on 2021-03-22 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('generator', '0005_output_sample_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reddit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subreddit', models.CharField(max_length=200)),
                ('year', models.IntegerField(default=2020)),
                ('month', models.IntegerField(default=1)),
                ('day', models.IntegerField(default=1)),
            ],
        ),
        migrations.RenameField(
            model_name='query',
            old_name='keywords',
            new_name='input_1',
        ),
        migrations.RenameField(
            model_name='query',
            old_name='product_name',
            new_name='input_2',
        ),
    ]
