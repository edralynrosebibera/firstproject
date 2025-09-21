from django.urls import path
from . import views

urlpatterns = [
    path('', views.flashcards_view, name="flashcards"),
]

