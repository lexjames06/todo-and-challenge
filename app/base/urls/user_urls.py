from django.urls import path

from base.views import user_views as views

urlpatterns = [
  path('', views.handle_users, name='handle_users'),
  path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('profile/', views.handle_users_profile, name='user_profile'),
  path('register/', views.handle_users_register, name='register_user'),
  path('<str:pk>/', views.handle_user, name='handle_user'),
]
