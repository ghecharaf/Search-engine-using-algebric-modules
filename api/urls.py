from django.urls import path
from .views import GetData

urlpatterns = [
    path('bool', GetData.as_view()),
]