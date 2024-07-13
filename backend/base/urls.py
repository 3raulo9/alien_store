from django.urls import path
from .views import *


urlpatterns = [
    path('cart/', Cart.as_view(), name='cart'),  # Endpoint for getting and adding items to cart
    path('cart/<int:pk>', Cart.as_view(), name='cart_item'),  # Endpoint for updating and deleting items in cart
    path('cart/checkout/', checkout, name='checkout'),  # Endpoint for checkout process
    path('products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroy.as_view(), name='product-retrieve-update-destroy'),
    path('translate/', translate, name='translate'),
    path('translate_batch/', translate_batch, name='translate_batch'),
    path('register/', register, name='register'),
    path('logout/', logout_view, name='logout'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('about/', about, name='about'),
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:user_id>/', ProfileDetail.as_view(), name='profile-detail'),
    path('user/', GetUserView.as_view(), name='get_user'),
]


