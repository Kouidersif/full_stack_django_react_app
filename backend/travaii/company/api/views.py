from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import CompanyProfileSerializer, UserCompanySerializer
from ..models import CompanyProfile
from django.contrib.auth import get_user_model
from travaii.permissions import permission
from travaii.token.CustomizedToken import MyTokenObtainPairSerializer
from jobs.api.serializers import JobModelSerializer, JobApplicationSerializer
from jobs.models import Job, JobApplication


User = get_user_model()




class CompanyUserSignupAPI(generics.CreateAPIView):
    " APIView to create a user account  "
    queryset = User
    serializer_class = UserCompanySerializer
    permission_classes = [ permissions.AllowAny ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.instance
        token = MyTokenObtainPairSerializer.get_token(user)
        refresh = token
        access = refresh.access_token
        response_data = {
            "data":serializer.data,
            "refresh" : str(refresh),
            "access" : str(access)
        }

        return Response(response_data, status=status.HTTP_201_CREATED)





class CompanyUserRetrieve(generics.RetrieveUpdateAPIView):
    " APIView to update/retrieve a user company account  "
    queryset = User
    serializer_class = UserCompanySerializer
    permission_classes = [ permissions.IsAuthenticated, permission.isUserObjectOwner ]
    lookup_field = "uuid"

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
        





class CompanyProfileAPIVIEW(generics.RetrieveUpdateAPIView):
    " View for retrieving and updating Profile instance "
    queryset = CompanyProfile
    serializer_class = CompanyProfileSerializer
    def retrieve(self, request):
        instance = CompanyProfile.objects.get(user=request.user)
        print(instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = CompanyProfile.objects.get(user=request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CompanyPostedJobs(generics.ListAPIView):
    serializer_class = JobModelSerializer
    def get_queryset(self):
        company_id = self.request.user.companyprofile
        queryset = Job.objects.filter(company_published=company_id).order_by("-time_stamp")
        return queryset


class ApplicationsToCoJobs(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    def get_queryset(self):
        company_id = self.request.user.companyprofile
        print(company_id)
        queryset = JobApplication.objects.filter(job__company_published=company_id)
        return queryset



