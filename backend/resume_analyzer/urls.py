from django.urls import path # type: ignore

from .views import upload_resume


urlpatterns = [
    path(
        'upload/',
        upload_resume,
    ),
]