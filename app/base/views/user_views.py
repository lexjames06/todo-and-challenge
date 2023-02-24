from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import User
from base.response_handlers.error_response import ErrorResponse
from base.response_handlers.success_response import SuccessResponse
from base.serializer import UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    serializer = UserSerializerWithToken(self.user).data
    for k, v in serializer.items():
      data[k] = v
    return data

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

'''
GET /api/users/
'''
@api_view(['GET'])
@permission_classes([IsAdminUser])
def handle_users(request):
  if request.method == 'GET':
    users = User.objects.all()
    user_serializer = UserSerializer(users, many=True)
    return SuccessResponse.OK(user_serializer.data)

'''
POST /api/users/register/
'''
@api_view(['POST'])
def handle_users_register(request):
  data = request.data

  if 'username' in data and User.objects.filter(username=data['username']):
    return ErrorResponse.FORBIDDEN('User with this username already exists')
  elif 'email' in data and User.objects.filter(email=data['email']):
    return ErrorResponse.FORBIDDEN('User with this email already exists')

  try:
    user = User.objects.create_user(
      username=data['username'],
      email=data['email'],
      password=data['password'],
    )

    serializer = UserSerializerWithToken(user, many=False)
    return SuccessResponse.CREATED(serializer.data)
  except:
    if 'username' not in data:
      return ErrorResponse.BAD_REQUEST('Username is required')
    elif 'email' not in data:
      return ErrorResponse.BAD_REQUEST('Email is required')
    elif 'password' not in data:
      return ErrorResponse.BAD_REQUEST('Password is required')

    return ErrorResponse.INTERNAL_SERVER_ERROR()

'''
GET /api/users/profile
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def handle_users_profile(request):
  user = request.user
  serializer = UserSerializerWithToken(user, many=False)
  return SuccessResponse.OK(serializer.data)

'''
GET /api/users/:pk
POST /api/users/:pk
DELETE /api/users/:pk
'''
@api_view(['GET','POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def handle_user(request, pk):
  if request.method == 'GET':
    try:
      user = User.objects.get(id=pk)
    except:
      return ErrorResponse.BAD_REQUEST('The user does not exist')

    request_user = request.user
    request_user_serializer = UserSerializer(request_user, many=False)
    request_user_id = request_user_serializer.data['id']

    if request_user_id == user.id:
      return SuccessResponse.OK(request_user_serializer.data)
    return ErrorResponse.UNAUTHORIZED('No permission to get user details')

  elif request.method == 'POST':
    user_data = JSONParser().parse(request)

    try:
      user = User.objects.get(id=pk)
      user_serializer = UserSerializer(user, data=user_data)

      if user_serializer.is_valid():
        user_serializer.save()
        return SuccessResponse.OK(user_serializer.data)

      return ErrorResponse.BAD_REQUEST(user_serializer.errors)
    except:
      return ErrorResponse.BAD_REQUEST('The user does not exist')


  elif request.method == 'DELETE':
    user = User.objects.get(id=pk)
    user.delete()
    return SuccessResponse.NO_CONTENT()
