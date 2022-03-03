"""tuzimbe_api URL Configuration
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("workers.urls")),
    path("", include("materials.urls")),
]
