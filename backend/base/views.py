import logging
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
from .models import Product, CartItem, User, Profile, OrderHistory
from .serializers import ProductSerializer, ProfileSerializer, UserSerializer, CartItemSerializer, OrderHistorySerializer
from rest_framework import generics
import threading
from rest_framework.views import APIView

# Logger setup
logger = logging.getLogger(__name__)


class ProductListCreate(generics.ListCreateAPIView):
    """
    Retrieve a list of all products or create a new product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get(self, request, *args, **kwargs):
        """
        Get the list of products.
        """
        logger.info("Retrieving list of products.")
        return super().get(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        """
        Create a new product.
        """
        logger.info("Creating a new product.")
        return super().post(request, *args, **kwargs)


class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a specific product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get(self, request, *args, **kwargs):
        """
        Retrieve a product by ID.
        """
        logger.info(f"Retrieving product with ID {kwargs.get('pk')}.")
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Update a product by ID.
        """
        logger.info(f"Updating product with ID {kwargs.get('pk')}.")
        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete a product by ID.
        """
        logger.info(f"Deleting product with ID {kwargs.get('pk')}.")
        return super().delete(request, *args, **kwargs)


@api_view(['POST'])
def logout_view(request):
    """
    Log out the user.
    """
    logout(request)
    logger.info("User logged out.")
    return Response('User logout')


class ProfileList(APIView):
    """
    List all profiles or create a new profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve all profiles.
        """
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        logger.info("Retrieving all profiles.")
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new profile.
        """
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info("Created a new profile.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"Failed to create profile: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserView(APIView):
    """
    Get the details of the currently authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve the current user's details.
        """
        serializer = UserSerializer(request.user)
        logger.info("Retrieved current user details.")
        return Response(serializer.data)


class ProfileDetail(APIView):
    """
    Retrieve, update, or delete a specific user's profile.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, user_id):
        """
        Get the profile for the given user ID.
        """
        try:
            return Profile.objects.get(user__id=user_id)
        except Profile.DoesNotExist:
            return None

    def get(self, request, user_id):
        """
        Retrieve the profile for the given user ID.
        """
        profile = self.get_object(user_id)
        if profile is None:
            logger.warning(f"Profile with user ID {user_id} does not exist.")
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile)
        logger.info(f"Retrieved profile for user ID {user_id}.")
        return Response(serializer.data)

    def put(self, request, user_id):
        """
        Update the profile for the given user ID.
        """
        profile = self.get_object(user_id)
        if not profile:
            profile = Profile.objects.create(user=request.user, username=request.user.username, email=request.user.email)

        if profile.user != request.user:
            logger.warning(f"User {request.user.id} attempted to update another user's profile.")
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Updated profile for user ID {user_id}.")
            return Response(serializer.data)
        logger.error(f"Failed to update profile for user ID {user_id}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        """
        Delete the profile for the given user ID.
        """
        profile = self.get_object(user_id)
        if profile is None:
            logger.warning(f"Profile with user ID {user_id} does not exist.")
            return Response(status=status.HTTP_404_NOT_FOUND)
        if profile.user != request.user:
            logger.warning(f"User {request.user.id} attempted to delete another user's profile.")
            return Response(status=status.HTTP_403_FORBIDDEN)
        profile.delete()
        logger.info(f"Deleted profile for user ID {user_id}.")
        return Response(status=status.HTTP_204_NO_CONTENT)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer to include the username in the token.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT token view to use the custom serializer.
    """
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def index(req):
    """
    A simple hello world endpoint.
    """
    logger.info("Visited index page.")
    return Response('hello')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def about(req):
    """
    An about page only accessible to authenticated users.
    """
    logger.info("Visited about page.")
    return HttpResponse("about")


@api_view(['POST'])
def register(request):
    """
    Register a new user and return a JWT token.
    """
    try:
        user = User.objects.create_user(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password']
        )
        user.is_active = True
        user.is_staff = request.data.get('is_staff', False)
        user.save()
        refresh = RefreshToken.for_user(user)
        logger.info(f"User {user.username} registered successfully.")
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    except Exception as e:
        logger.error(f"Failed to register user: {str(e)}")
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


selected_language = None


def perform_translation(sentences, selected_language, results, index):
    """
    Perform translation for a chunk of sentences.
    """
    translator = Translator()
    translations = [translator.translate(sentence, dest=selected_language).text for sentence in sentences]
    results[index] = " ".join(translations)


@api_view(['POST'])
def translate(request):
    """
    Translate a batch of sentences into the selected language.
    """
    global selected_language
    if request.method == "POST":
        data = request.data
        your_sentence = data.get("input_text")
        selected_language = data.get('language')
        
        if not your_sentence or not selected_language:
            logger.warning("No text or language provided for translation.")
            return Response({'error': "No text or language provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        sentences = your_sentence.split('. ')
        num_threads = 20
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
        logger.info(f"Translated text to {selected_language}.")
        return Response({'translated_text': translated_text, 'selected_language': selected_language})
    
    logger.warning("Invalid request method for translation.")
    return Response({'error': "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def translate_batch(request):
  """
  Translate a batch of texts into the selected language.
  """
  if request.method == "POST":
    data = request.data
    input_texts = data.get("input_texts")
    selected_language = data.get('language', 'en')  

    if not input_texts or not isinstance(input_texts, list):
      logger.warning("Invalid texts provided for batch translation.")
      return Response({'error': "Invalid texts provided"}, status=status.HTTP_400_BAD_REQUEST)

    translator = Translator()
    translated_texts = []
    for text in input_texts:
      translation = translator.translate(text, dest=selected_language)
      translated_texts.append(translation.text)

    logger.info(f"Batch translation completed to {selected_language}.")
    return Response({'translated_texts': translated_texts, 'selected_language': selected_language})
  
  logger.warning("Invalid request method for batch translation.")
  return Response({'error': "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class Cart(APIView):
    """
    Manage the user's shopping cart.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve all items in the cart for the current user.
        """
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        logger.info("Retrieved all items from the cart.")
        return Response(serializer.data)

    def post(self, request, pk):
        """
        Add a product to the cart.
        """
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
        logger.info(f"Added {quantity} of product {product.name} to the cart.")
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """
        Remove an item from the cart.
        """
        cart_item = get_object_or_404(CartItem, user=request.user, pk=pk)
        cart_item.delete()
        logger.info(f"Removed item with ID {pk} from the cart.")
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        """
        Update the quantity of an item in the cart.
        """
        cart_item = get_object_or_404(CartItem, user=request.user, pk=pk)
        quantity = request.data.get('quantity', 1)
        cart_item.quantity = quantity
        cart_item.save()
        logger.info(f"Updated quantity for item with ID {pk} to {quantity}.")
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    """
    Retrieve all order histories for the current user.
    """
    order_histories = OrderHistory.objects.filter(user=request.user)
    serializer = OrderHistorySerializer(order_histories, many=True)
    logger.info("Retrieved order histories for the current user.")
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    """
    Checkout the cart and create an order history.
    """
    cart_items = CartItem.objects.filter(user=request.user)
    if not cart_items:
        logger.warning("No items in the cart to checkout.")
        return Response({"detail": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Serialize cart items to store in order history
    cart_items_data = CartItemSerializer(cart_items, many=True).data

    # Create an order history record
    order_history = OrderHistory.objects.create(
        user=request.user,
        items=cart_items_data
    )

    # Delete cart items
    cart_items.delete()
    logger.info("Checked out successfully.")
    return Response({"detail": "Checked out successfully"}, status=status.HTTP_200_OK)
