from django.urls import path
from .views import (
    PostJobs,
    ListJobAPIVIEW,
    JobOfferRetrieve,
    JobApplicationEndpoint,
    ListCategories,
    JobApplicationRetriever
)
from ..views import add_data


urlpatterns = [
    path("", ListJobAPIVIEW.as_view(), name="job_list_create"),
    path("category/", ListCategories.as_view(), name="list_Categories"),
    path("post-job/", PostJobs.as_view(), name="create_job_offer"),
    path("<int:pk>/", JobOfferRetrieve.as_view(), name="job_list_create"),
    path("apply/<int:pk>/", JobApplicationEndpoint.as_view(), name="apply_for_job"),
    path("update/app/<int:pk>/", JobApplicationRetriever.as_view(), name="edit_application"),
    path("data/", add_data, name="data"),
]