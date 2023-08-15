# Generated by Django 4.2.3 on 2023-07-14 11:44

from django.db import migrations, models
import travaii.methods.customize_file_path


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompanyProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255, null=True, unique=True)),
                ('company_address', models.CharField(max_length=400, null=True)),
                ('about_company', models.TextField(null=True)),
                ('num_employees', models.CharField(choices=[('1-10', '1-10'), ('11-20', '11-20'), ('21-49', '21-49'), ('50-99', '50-99'), ('100-249', '100-249'), ('250-499', '250-499'), ('500-999', '500-999'), ('1000 or more', '1000 or more')], max_length=299, null=True)),
                ('company_logo', models.ImageField(blank=True, null=True, upload_to=travaii.methods.customize_file_path.customize_display_url)),
                ('time_stamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]