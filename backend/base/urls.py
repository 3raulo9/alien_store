from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path("", views.index),
    path("products/", views.getProducts, name="products"),
    path("product/<str:pk>/", views.getProduct, name="product"),
    path("about/", views.about),
    path("login/", TokenObtainPairView.as_view()),
    path("logout/", views.logout, name="logout"),
    path("register/", views.register),
]
