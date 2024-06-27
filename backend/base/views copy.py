from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User

from rest_framework import status

from .models import Product
from .serializers import ProductSerializer


from googletrans import Translator

from django.contrib.auth import logout

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response('User logout')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        # ...
 
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
        user.is_staff = False  # Be cautious about automatically making users staff.
        user.save()

        # Generate tokens for the newly created user
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
        selected_language = data.get('language', 'fr')  # Get the selected language from the request

        translator = Translator()
        translation = translator.translate(your_sentence, dest=selected_language)
        translated_text = translation.text

        return Response({'translated_text': translated_text, 'selected_language': selected_language})
    return Response({'error': "No text received"}, status=status.HTTP_400_BAD_REQUEST)

