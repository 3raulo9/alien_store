from django.shortcuts import get_object_or_404
from django.contrib.auth import logout
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from googletrans import Translator
from .models import Product, CartItem, User
from .serializers import ProductSerializer, CartItemSerializer, CartItemCreateSerializer
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import CartItem, Product
from .serializers import CartItemSerializer, CartItemCreateSerializer

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response('User logout')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def index(req):
    return Response('hello')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def about(req):
    return HttpResponse("about")

@api_view(['POST'])
def register(request):
    try:
        user = User.objects.create_user(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password']
        )
        user.is_active = True
        user.is_staff = False
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProducts(req):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(req, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

selected_language = 'fr'  # Default language

@api_view(['POST'])
def translate(request):
    global selected_language
    if request.method == "POST":
        data = request.data
        your_sentence = data.get("input_text")
        selected_language = data.get('language', 'fr')
        translator = Translator()
        translation = translator.translate(your_sentence, dest=selected_language)
        translated_text = translation.text
        return Response({'translated_text': translated_text, 'selected_language': selected_language})
    return Response({'error': "No text received"}, status=status.HTTP_400_BAD_REQUEST)



class Cart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        product = get_object_or_404(Product, _id=pk)
        quantity = request.data.get('quantity', 1)
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={
                'name': product.name,
                'image': product.image,
                'price': product.price,
                'quantity': quantity
            }
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, user=request.user, pk=pk)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        cart_item = get_object_or_404(CartItem, user=request.user, pk=pk)
        quantity = request.data.get('quantity', 1)
        cart_item.quantity = quantity
        cart_item.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart_items = CartItem.objects.filter(user=request.user)
    if not cart_items:
        return Response({"detail": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)
    cart_items.delete()
    return Response({"detail": "Checked out successfully"}, status=status.HTTP_200_OK)
