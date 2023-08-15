from django.contrib import admin
from .models import Job, Categories, JobApplication


admin.site.register(Job)
admin.site.register(Categories)
admin.site.register(JobApplication)
