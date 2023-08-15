from django.urls import path
from .views import ( 
    ApplicantSignupAPI, ApplicantProfileCRUDAPI, ViewUserApplications, RetrieveUserApplication, ApplicantUserRetrieve
)

urlpatterns = [
    path("sign-up/", ApplicantSignupAPI.as_view(), name="applicant_signup"),
    path("account/<str:uuid>/", ApplicantUserRetrieve.as_view(), name="applicant_signup"),
    path("profile/", ApplicantProfileCRUDAPI.as_view(), name="applicant_crud"),
    path("view-applications/", ViewUserApplications.as_view(), name="view_applications"),
    path("view-applications/<int:pk>/", RetrieveUserApplication.as_view(), name="retrieve_app"),
]