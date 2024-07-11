from django.urls import path
from .views import *


urlpatterns = [
    path('cart/', Cart.as_view(), name='cart'),  # Endpoint for getting and adding items to cart
    path('cart/<int:pk>', Cart.as_view(), name='cart_item'),  # Endpoint for updating and deleting items in cart
    path('cart/checkout/', checkout, name='checkout'),  # Endpoint for checkout process

    # Your other endpoints http://localhost:3000/translate_batch/
    path('products/', getProducts, name='get_products'),
    path('products/<int:pk>/', getProduct, name='get_product'),
    path('translate/', translate, name='translate'),
    path('translate_batch/', translate_batch, name='translate_batch'),
    path('register/', register, name='register'),
    path('logout/', logout_view, name='logout'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('about/', about, name='about'),
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:user_id>/', ProfileDetail.as_view(), name='profile-detail'),
    path('user/', GetUserView.as_view()),
]


