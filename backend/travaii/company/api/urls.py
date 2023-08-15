from django.urls import path
from .views import ( 
    CompanyProfileAPIVIEW, CompanyUserSignupAPI, CompanyUserRetrieve, CompanyPostedJobs,ApplicationsToCoJobs
)

urlpatterns = [
    path("sign-up/", CompanyUserSignupAPI.as_view(), name="company_user_signup"),
    path("account/<str:uuid>/", CompanyUserRetrieve.as_view(), name="user_company_account"),
    path("profile/", CompanyProfileAPIVIEW.as_view(), name="company_profile"),
    path("posted-jobs/", CompanyPostedJobs.as_view(), name="posted_jobs"),
    path("received-apps/", ApplicationsToCoJobs.as_view(), name="viewApps"),

]