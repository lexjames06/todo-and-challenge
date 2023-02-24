from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from base.models import Todo, User

class UserAdmin(BaseUserAdmin):
  model = User
  fieldsets =[
    *BaseUserAdmin.fieldsets,
    (
      'Additional Info',
      {
        'fields':(
          'is_private',
          'is_admin'
        )
      }
    )
  ]

admin.site.register(Todo)
admin.site.register(User, UserAdmin)
