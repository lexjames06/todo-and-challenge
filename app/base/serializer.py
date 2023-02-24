# from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from base.models import Todo, User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'is_admin', 'is_private']

class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'is_admin', 'is_private', 'token']

  def get_token(self, obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'