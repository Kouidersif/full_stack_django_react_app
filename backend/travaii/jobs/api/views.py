from rest_framework import generics, status, permissions, authentication
from rest_framework.response import Response
from ..models import Job, JobApplication, Categories
from travaii.permissions.permission import isAuthenticatedAndJobPublisher
from .serializers import ( 
    JobModelSerializer,
    JobApplicationSerializer,
    CategoriesSerializer
)
from travaii.permissions import permission
from rest_framework import filters
from rest_framework import pagination



class JobPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostJobs(generics.CreateAPIView):
    serializer_class = JobModelSerializer
    queryset = Job.objects.all()
    permission_classes = [ permissions.IsAuthenticated ,permission.isUseraCompany ]
    def create(self, request, *args, **kwargs):
        category = request.data["category"]
        serializer = self.get_serializer(data=request.data, context={"request": request, "category":category})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)




class ListJobAPIVIEW(generics.ListAPIView):
    " API endpoint for listing Job objects "
    serializer_class = JobModelSerializer
    queryset = Job.objects.all().order_by("-time_stamp")
    permission_classes = [ permissions.AllowAny ]
    filter_backends = [filters.SearchFilter]
    search_fields = [ "title", "salary_range"]
    pagination_class = JobPagination




class ListCategories(generics.ListAPIView):
    " API endpoint for listing Job objects "
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()
    permission_classes = [ permissions.AllowAny ]



class JobOfferRetrieve(generics.RetrieveUpdateDestroyAPIView):
    "Endpoint to perform all RUD operations"
    serializer_class = JobModelSerializer
    queryset = Job 
    permission_classes = [ permissions.AllowAny ]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            application_instance = JobApplication.objects.filter(job=instance, applicant=request.user.applicantsprofile).exists()
        except:
            application_instance = ""
        serializer = self.get_serializer(instance)
        response_data = {
            "applied":application_instance,
            "jobs":serializer.data
        }
        return Response(response_data)

    def update(self, request, *args, **kwargs):
        category = request.data.get("category")
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        if request.user.is_authenticated and instance.company_published.user == request.user:
            serializer = self.get_serializer(instance, data=request.data, partial=partial, context={"category":category})
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_authenticated and instance.company_published.user == request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        


class JobApplicationEndpoint(generics.CreateAPIView):
    serializer_class = JobApplicationSerializer
    queryset = JobApplication
    def create(self, request, pk, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request":request, "pk":pk})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)


class JobApplicationRetriever(generics.RetrieveUpdateAPIView):
    serializer_class = JobApplicationSerializer
    queryset = JobApplication
    permission_classes = [ permission.isAuthenticatedAndJobPublisherApplication ]
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
        

    



