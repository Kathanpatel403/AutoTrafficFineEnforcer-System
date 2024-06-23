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
from .models import Profile
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            # Check if the username already exists
            if User.objects.filter(username=request.data.get('username')).exists():
                return Response({"username": "This username already exists. Please choose another one."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the email already exists
            if User.objects.filter(email=request.data.get('email')).exists():
                return Response({"email": "This email already exists. Please choose another one."}, status=status.HTTP_400_BAD_REQUEST)

            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            
            # Assign user to the normal_user group
            group = Group.objects.get(name='normal_user')
            user.groups.add(group)

            # Create Profile instance
            Profile.objects.create(user=user)
            print("user created successfully!")

            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'groups': [group.name]
                }
            }, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def additional_info_view(request):
    token_key = request.headers.get('Authorization', '').split('Token ')[-1]
    
    try:
        token = Token.objects.get(key=token_key)
        user = token.user
    except Token.DoesNotExist:
        return Response({"message": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    profile, created = Profile.objects.get_or_create(user=user)

    profile.first_name = request.data.get('first_name')
    profile.last_name = request.data.get('last_name')

    # Validate Aadharcard number
    aadharcard_no = request.data.get('aadharcard_no')
    if aadharcard_no:
        aadharcard_validator = RegexValidator(regex=r'^\d{12}$', message='Aadharcard number must be exactly 12 digits long')
        try:
            aadharcard_validator(aadharcard_no)
        except ValidationError as e:
            return Response({"message": e.message}, status=status.HTTP_400_BAD_REQUEST)
        profile.aadharcard_no = aadharcard_no

    # Validate Mobile number
    mobile_no = request.data.get('mobile_no')
    if mobile_no:
        mobile_validator = RegexValidator(regex=r'^\d{10}$', message='Mobile number must be exactly 10 digits long')
        try:
            mobile_validator(mobile_no)
        except ValidationError as e:
            return Response({"message": e.message}, status=status.HTTP_400_BAD_REQUEST)
        profile.mobile_no = mobile_no

    profile.house_no = request.data.get('house_no')
    profile.area = request.data.get('area')
    profile.city = request.data.get('city')
    profile.save()

    return Response({
        "message": "Additional information saved successfully"
    }, status=status.HTTP_200_OK)

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
    return Response({"error": "Username or password incorrect. Try again."}, status=status.HTTP_400_BAD_REQUEST)


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
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
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