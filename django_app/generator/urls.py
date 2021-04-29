from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name="generator-home"),

    path("generate_json_copypress/", views.query_json_copypress, name="generate-api-copypress"),
    path("generate_json_focusgroup/", views.query_json_focusgroup, name="generate-api-focusgroup"),
]