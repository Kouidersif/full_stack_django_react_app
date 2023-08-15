from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from company.models import CompanyProfile
from applicants.models import ApplicantsProfile
import uuid 



class User(AbstractUser):
    email = models.EmailField(unique=True)
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    username = models.CharField(max_length=299, null=True, blank=True)
    is_company = models.BooleanField(null=True, blank=True, default=False)
    is_applicant = models.BooleanField(null=True, blank=True, default=False)

    USERNAME_FIELD = "email" 
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.is_applicant:
        ApplicantsProfile.objects.create(user = instance)
    elif created and instance.is_company:
        CompanyProfile.objects.create(user = instance)

