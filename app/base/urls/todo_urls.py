from django.urls import path

from base.views import todo_views as views

urlpatterns = [
  path('', views.handle_todos, name='handle-todos'),
  path('<str:pk>/', views.handle_todo, name='handle-todo'),
]
