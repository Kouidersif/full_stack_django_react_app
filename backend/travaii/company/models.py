from django.db import models
from django.contrib.auth import get_user_model
import os
from django.conf import settings
from travaii.methods.customize_file_path import customize_display_url



User = settings.AUTH_USER_MODEL



company_size=[
    ('1-10', '1-10'),
    ('11-20', '11-20'),
    ('21-49', '21-49'),
    ('50-99', '50-99'),
    ('100-249', '100-249'),
    ('250-499', '250-499'),
    ('500-999', '500-999'),
    ('1000 or more', '1000 or more'),
]



class CompanyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255, unique=True, null=True)
    company_address = models.CharField(max_length=400, null=True)
    about_company = models.TextField(null=True)
    num_employees = models.CharField(max_length=299, choices=company_size, null=True)
    company_logo = models.ImageField(upload_to=customize_display_url, null=True, blank=True )
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Company - user : {self.user.email}"


