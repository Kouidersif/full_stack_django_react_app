from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.conf import settings
from travaii.methods.customize_file_path import customize_display_url


User = settings.AUTH_USER_MODEL

privacy=[
        ('Anyone','Anyone'),
        ('Only you','Only you'),
    ]






class ApplicantsProfile(models.Model):
    accepted_exts = ['pdf', 'jpg', 'jpeg', 'png', 'docx']
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(blank=True, upload_to=customize_display_url, null=True, default="/default/imgDefault.png")
    resume = models.FileField(upload_to=customize_display_url, validators=[FileExtensionValidator( accepted_exts )], null=True)
    github= models.URLField(blank=True, null=True, unique=True)
    personal_website= models.URLField(blank=True, null=True, unique=True)
    is_public= models.CharField(max_length=20, choices=privacy, default='Anyone')
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Applicant - user : {self.user.email}"