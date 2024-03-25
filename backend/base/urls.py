from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import MyTokenObtainPairView  # Make sure this import is added
from .views import logout_view

urlpatterns = [
    path("", views.index),
    path("products/", views.getProducts, name="products"),
    path("product/<str:pk>/", views.getProduct, name="product"),
    path("about/", views.about),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", logout_view, name="logout"),
    path("register/", views.register),
    
    path("translate/", views.translate, name="translate"),
]
