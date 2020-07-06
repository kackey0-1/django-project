# coding: utf-8
import os
import django
import env_file
from channels.routing import get_default_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
env_file.load()
django.setup()
application = get_default_application()
