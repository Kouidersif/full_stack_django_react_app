from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .token.CustomizedToken import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenBlacklistView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    # Auth
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    # Apps
    path('admin/', admin.site.urls),
    path('api/', include("jobs.api.urls")),
    path('api/users/', include("users.api.urls")),
    path('api/company/', include("company.api.urls")),
    path('api/applicants/', include("applicants.api.urls")),

]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)