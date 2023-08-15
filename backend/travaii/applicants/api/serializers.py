from rest_framework import serializers 
from django.contrib.auth import get_user_model
from ..models import ApplicantsProfile

User = get_user_model()



class UserApplicantSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [ "id", "email", "password", "first_name", "last_name", "is_applicant" ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data["email"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]

        if User.objects.filter(email=email.lower()).exists():
            raise serializers.ValidationError([{"Validator":"Email address already exists."}])
        user_instance = User(
            email = email,
            first_name = first_name,
            last_name = last_name,
            is_applicant = True
        )
        user_instance.set_password(password)
        user_instance.save()

        return user_instance




class ApplicantProfileSerializer(serializers.ModelSerializer):
    user = UserApplicantSerializer(many=False, read_only=True)
    class Meta :
        model = ApplicantsProfile
        fields = [ "profile_pic", "user", "resume", "github", "personal_website", "is_public", "time_stamp" ]