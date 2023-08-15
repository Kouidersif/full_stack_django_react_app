from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
import requests
from .models import Job
from company.models import CompanyProfile


long_text = '''Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at urna tincidunt, volutpat lectus ut, gravida enim. Maecenas sed nunc nec turpis gravida luctus. Pellentesque in diam est. Nulla facilisi. Nunc pulvinar vel turpis nec porttitor. In hendrerit, massa eget tincidunt dictum, metus velit varius arcu, at pellentesque justo orci sit amet massa. In fringilla, nunc vel accumsan rhoncus, libero eros aliquet risus, vel varius mi nibh non ligula. Sed sed risus mi. Donec nec 
consequat metus, eu tristique risus. Mauris non magna sit amet ex volutpat convallis nec vel mauris.'''


def add_data(request):
    url = "https://jsonplaceholder.typicode.com/todos/"
    resp = requests.get(url)
    data = resp.json()
    for data in resp:
        obj = Job.objects.all()
        for o in obj:
            inst = Job.objects.get(id=o.id)
            inst.title = "this is title"
            inst.save()
        # co_instance = CompanyProfile.objects.get(id=7)
        # obj.company_published = co_instance
        # obj.save()
    return HttpResponse("Done")