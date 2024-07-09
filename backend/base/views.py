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
from .serializers import *
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
import threading
from .models import CartItem, Product


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response('User logout')

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

selected_language = None

def perform_translation(sentences, selected_language, results, index):
    translator = Translator()
    translations = [translator.translate(sentence, dest=selected_language).text for sentence in sentences]
    results[index] = " ".join(translations)

@api_view(['POST'])
def translate(request):
    global selected_language
    if request.method == "POST":
        data = request.data
        your_sentence = data.get("input_text")
        selected_language = data.get('language')
        
        if not your_sentence or not selected_language:
            return Response({'error': "No text or language provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        sentences = your_sentence.split('. ')
        num_threads = 5
        chunk_size = max(1, len(sentences) // num_threads)
        
        chunks = [sentences[i * chunk_size:(i + 1) * chunk_size] for i in range(num_threads)]
        
        results = {}
        
        threads = []
        for i, chunk in enumerate(chunks):
            thread = threading.Thread(target=perform_translation, args=(chunk, selected_language, results, i))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        translated_text = " ".join(results[i] for i in range(num_threads) if i in results)
        return Response({'translated_text': translated_text, 'selected_language': selected_language})
    
    return Response({'error': "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def translate_batch(request):
    global selected_language
    if request.method == "POST":
        data = request.data
        input_texts = data.get("input_texts")
        selected_language = data.get('language')

        if not input_texts or not selected_language:
            return Response({'error': "No texts or language provided"}, status=status.HTTP_400_BAD_REQUEST)

        translator = Translator()
        translated_texts = []
        for text in input_texts:
            translation = translator.translate(text, dest=selected_language)
            translated_texts.append(translation.text)

        return Response({'translated_texts': translated_texts, 'selected_language': selected_language})
    
    return Response({'error': "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


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
