from ..models import Job, JobApplication, Categories
from rest_framework import serializers
from company.api.serializers import CompanyProfileSerializer
from datetime import datetime
from django.utils.timesince import timesince
from applicants.api.serializers import ApplicantProfileSerializer



class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [ "id", "category_name" ]



class JobModelSerializer(serializers.ModelSerializer):
    company_published = CompanyProfileSerializer(many=False, read_only=True)
    time_stamp = serializers.SerializerMethodField()
    category = CategoriesSerializer(many=False, read_only=True)
    " Serializing Job Model in order to use it for API "
    class Meta:
        model = Job
        fields = [ "id", "title", "description", "company_published", "work_place", "category", "salary_range", "time_stamp" ]

    def create(self, validated_data):
        categ = self.context["category"]
        request = self.context["request"]
        validated_data["company_published"] = request.user.companyprofile
        
        try:
            job_category = Categories.objects.get(id=categ)
        except Categories.DoesNotExist:
            raise serializers.ValidationError({"validator":"Categories matching query does not exist."})
        instance = Job.objects.create(**validated_data)
        
        instance.category = job_category
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """
        Update and return an existing `Job` instance, given the validated data.
        """
        job_category = ""
        try:
            categ = self.context["category"]
            if categ:
                job_category = Categories.objects.get(id=categ)
        except Categories.DoesNotExist:
            raise serializers.ValidationError({"validator":"Categories matching query does not exist."})
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.work_place = validated_data.get('work_place', instance.work_place)
        if job_category:
            instance.category = job_category
        instance.salary_range = validated_data.get('salary_range', instance.salary_range)
        instance.save()
        return instance

    def get_time_stamp(self, obj):
        return timesince(obj.time_stamp)


class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobModelSerializer(many=False, read_only=True)
    sent_at = serializers.SerializerMethodField()
    applicant = ApplicantProfileSerializer(many=False, read_only=True)
    class Meta:
        model = JobApplication
        fields = [ "id", "job", "cover_letter", "applicant", "sent_at", "request", "response_message" ]

    def create(self, validated_data):
        user_request = self.context["request"].user.applicantsprofile
        pk = self.context["pk"]
        job_instance = Job.objects.get(id=pk)
        validated_data["applicant"] = user_request
        cover_letter = validated_data["cover_letter"]

        if JobApplication.objects.filter(job=job_instance, applicant=user_request).exists():
            raise serializers.ValidationError({"validator": "You have already applied to this job"})

        instance = JobApplication.objects.create(
            job=job_instance,
            cover_letter=cover_letter,
            applicant = user_request
        )
        return instance
    
    def get_sent_at(self, obj):
        return obj.sent_at.strftime('%d-%m-%Y %H:%M:%S')

