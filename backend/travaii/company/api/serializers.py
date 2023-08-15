from rest_framework import serializers 
from django.contrib.auth import get_user_model
from ..models import CompanyProfile

User = get_user_model()



class UserCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id", "email", "password", "first_name", "last_name", "is_company" ]
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
            is_company = True
        )
        user_instance.set_password(password)
        user_instance.save()

        return user_instance




class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta :
        model = CompanyProfile
        fields = [ "id", "company_name", "company_address", "about_company", "num_employees", "company_logo", "time_stamp" ]