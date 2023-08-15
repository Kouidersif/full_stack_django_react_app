from django.db import models
from company.models import CompanyProfile
from applicants.models import ApplicantsProfile



class Categories(models.Model):
    category_name = models.CharField(max_length=299)
    def __str__(self):
        return self.category_name


class Job(models.Model):
    work_place_choices = [
        ("Remote", "Remote"),
        ("Hybrid", "Hybrid"),
        ("Office", "Office"),
    ]
    company_published = models.ForeignKey(CompanyProfile, related_name='job_offer' ,on_delete=models.CASCADE, null=True) 
    title = models.CharField(max_length=600)
    description = models.TextField()
    work_place = models.CharField(max_length=255, choices=work_place_choices)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True)
    salary_range = models.CharField(max_length=299, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


class JobApplication(models.Model):
    status=[
        ('Approved', 'Approved'),
        ('Pending', 'Pending'),
        ('Considered', 'Considered'),
        ('No Luck', 'No Luck'),
    ]
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    applicant = models.ForeignKey(ApplicantsProfile, on_delete=models.CASCADE)
    cover_letter = models.TextField(null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    request= models.CharField(max_length=10, choices=status, default='Pending' , null=True)
    response_message = models.TextField(null=True, blank=True)
    def __str__(self):
        return f"Job Application for {job.title}"