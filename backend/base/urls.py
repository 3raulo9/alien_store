from django.urls import path
from .views import Cart, MyTokenObtainPairView, logout_view, register, getProducts, getProduct, translate, about, checkout

urlpatterns = [
    path('cart/', Cart.as_view(), name='cart'),  # Endpoint for getting and adding items to cart
    path('cart/<int:pk>', Cart.as_view(), name='cart_item'),  # Endpoint for updating and deleting items in cart
    path('cart/checkout/', checkout, name='checkout'),  # Endpoint for checkout process

    # Your other endpoints
    path('products/', getProducts, name='get_products'),
    path('products/<int:pk>/', getProduct, name='get_product'),
    path('translate/', translate, name='translate'),
    path('register/', register, name='register'),
    path('logout/', logout_view, name='logout'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('about/', about, name='about'),
]
