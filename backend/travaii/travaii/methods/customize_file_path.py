import os
from django.utils import timezone
import uuid



# Method to customize uploaded files' path
def customize_display_url(instance, filename):
    # Get the current company instance's ID
    instance_id = instance.id
    # Generate a random UUID
    random_uuid = uuid.uuid4()
    file_name, file_ext = os.path.splitext(filename)
    # Add instnance id to make path as unique as possible
    new_filename = f"{file_name}_{random_uuid}_{instance_id}{file_ext}"
    return os.path.join(f"files/upload/", new_filename)
