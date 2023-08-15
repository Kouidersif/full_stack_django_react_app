# https://jsonplaceholder.typicode.com/todos/
import requests
from jobs.models import Job
from company.models import CompanyProfile


"""
company_published
title
description
work_place
salary_range
"""
long_text = '''Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at urna tincidunt, volutpat lectus ut, gravida enim. Maecenas sed nunc nec turpis gravida luctus. Pellentesque in diam est. Nulla facilisi. Nunc pulvinar vel turpis nec porttitor. In hendrerit, massa eget tincidunt dictum, metus velit varius arcu, at pellentesque justo orci sit amet massa. In fringilla, nunc vel accumsan rhoncus, libero eros aliquet risus, vel varius mi nibh non ligula. Sed sed risus mi. Donec nec 
consequat metus, eu tristique risus. Mauris non magna sit amet ex volutpat convallis nec vel mauris.'''

def add_data():
    url = "https://jsonplaceholder.typicode.com/todos/"
    resp = requests.get(url)
    data = resp.json()
    for data in resp:
        obj = Job.objects.create(
            title = data.title,
            description= long_text,
            work_place= "Remote",
            salary_range="2500"
        )
        co_instance = CompanyProfile.object.get(id=7)
        obj.company_published = co_instance
        obj.save()
    print("done...!")




if __name__ == '__main__':
    add_data()