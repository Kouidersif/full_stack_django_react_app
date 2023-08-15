from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import UserApplicantSerializer, ApplicantProfileSerializer
from django.contrib.auth import get_user_model
from ..models import ApplicantsProfile
from jobs.models import JobApplication
from jobs.api.serializers import JobApplicationSerializer
from travaii.permissions import permission
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from travaii.token.CustomizedToken import MyTokenObtainPairView, MyTokenObtainPairSerializer



User = get_user_model()



class ApplicantSignupAPI(generics.CreateAPIView):
    queryset = User
    serializer_class = UserApplicantSerializer
    permission_classes = [ permissions.AllowAny ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Defining user after creation
        user = serializer.instance

        # Get the access and refresh tokens as strings
        token = MyTokenObtainPairSerializer.get_token(user)
        refresh = str(token)
        access = str(token.access_token)

        response_data = serializer.data
        response_data["access"] = access
        response_data["refresh"] = refresh

        return Response(response_data, status=status.HTTP_201_CREATED)



class ApplicantUserRetrieve(generics.RetrieveUpdateAPIView):
    " APIView to update/retrieve a user applicant account  "
    queryset = User
    serializer_class = UserApplicantSerializer
    permission_classes = [ permissions.IsAuthenticated, permission.isUserObjectOwner ]
    lookup_field = "uuid"
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)



class ApplicantProfileCRUDAPI(generics.RetrieveUpdateAPIView):
    serializer_class = ApplicantProfileSerializer
    queryset = ApplicantsProfile
    parser_classes = [ MultiPartParser, FormParser ]
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = ApplicantsProfile.objects.get(user=request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = ApplicantsProfile.objects.get(user=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



class ViewUserApplications(generics.ListAPIView):
    """
    View for listing all objects related to user
    """
    serializer_class = JobApplicationSerializer
    # Ovveriden queryset method to view applications related to the user
    def get_queryset(self):
        user = self.request.user.applicantsprofile
        queryset = JobApplication.objects.filter(applicant=user)
        return queryset


class RetrieveUserApplication(generics.RetrieveAPIView):
    """
    Retrieve applications by pk for the authenticated user
    """
    queryset = JobApplication
    serializer_class = JobApplicationSerializer
    permission_classes = [ permission.isApplicationOwnerOrFalse ]


