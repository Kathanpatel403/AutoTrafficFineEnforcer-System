from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        # Assign user to the normal_user group
        group = Group.objects.get(name='normal_user')
        user.groups.add(group)
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'groups': [group.name]
            }
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        
        # Get user groups
        user_groups = user.groups.values_list('name', flat=True)
        
        return Response({
            "message": "Login successful",
            "user": {
                "username": user.username,
                "email": user.email,
                "groups": list(user_groups)
            },
            "token": token.key
        }, status=status.HTTP_200_OK)
    return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({"message": "Logout successful"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
    

@api_view(['POST'])
def create_police_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate input data
    if not username or not email or not password:
        return Response({'error': 'Username, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if a user with the given username or email already exists
        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            return Response({'error': 'Username or email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the new user with hashed password
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
        )

        # Assign the police role to the user
        police_group = Group.objects.get(name='police')
        user.groups.add(police_group)

        return Response({'message': f'User {username} created as a police user successfully.'}, status=status.HTTP_201_CREATED)

    except Group.DoesNotExist:
        return Response({'error': 'The police group does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Failed to create police user: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)