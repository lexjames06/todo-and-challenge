from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from uuid import uuid4

from base.managers import CustomUserManager

class Todo(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  text = models.TextField()
  user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

  def __str__(self):
    return self.id

class User(AbstractUser):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  email = models.EmailField(_('email address'), blank=True, unique=True)
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  is_private = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  username = models.CharField(max_length=20, unique=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  objects = CustomUserManager()

  def __str__(self):
    return self.username