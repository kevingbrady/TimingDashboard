import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Timing_Testbed_Dashboard.settings")
django.setup()

"""
WSGI config for Timing_Testbed_Dashboard project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""


from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
