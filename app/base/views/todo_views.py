from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from base.models import Todo, User
from base.response_handlers.error_response import ErrorResponse
from base.response_handlers.success_response import SuccessResponse
from base.serializer import TodoSerializer, UserSerializerWithToken

'''
GET     /api/todos
POST    /api/todos
'''
@api_view(['GET', 'POST'])
def handle_todos(request: Request):
  if request.method == 'GET':
    request_user = request.user
    author_userId = request.query_params.get('userId', None)

    if not author_userId:
      ErrorResponse.BAD_REQUEST('The user ID is required')

    if request_user:
      user_serializer = UserSerializerWithToken(request_user, many=False)
      request_id = user_serializer.data['id']
      if request_id == author_userId:
        todos = Todo.objects.filter(user_id=request_id)
        todos_serializer = TodoSerializer(todos, many=True)
        return SuccessResponse.OK(todos_serializer.data)

    try:
      authorUser = User.objects.get(id=author_userId)
    except:
      return ErrorResponse.NOT_FOUND('User does not exist')

    if authorUser.is_private:
      return ErrorResponse.UNAUTHORIZED('User\'s account is private')

    todos = Todo.objects.filter(user_id=author_userId)
    todos_serializer = TodoSerializer(todos, many=True)
    return SuccessResponse.OK(todos_serializer.data)

  if request.method == 'POST':
    todo_data = JSONParser().parse(request)
    new_todo = {'text': todo_data['text'], 'completed': False, 'user_id': todo_data['userId']}
    todo_serializer = TodoSerializer(data=new_todo)

    if todo_serializer.is_valid():
      todo_serializer.save()

      return SuccessResponse.CREATED(todo_serializer.data)

    return ErrorResponse.BAD_REQUEST(todo_serializer.errors)

'''
GET     /api/todos/:pk
POST    /api/todos/:pk
DELETE  /api/todos/:pk
'''
@api_view(['GET','POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def handle_todo(request, pk):
  if request.method == 'GET':
    try:
      todo = Todo.objects.get(id=pk)
    except:
      return ErrorResponse.BAD_REQUEST('The todo does not exist')

    todo_serializer = TodoSerializer(todo, many=False)
    return SuccessResponse.OK(todo_serializer.data)

  elif request.method == 'POST':
    todo_data = JSONParser().parse(request)

    try:
      todo = Todo.objects.get(id=pk)
      todo_serializer = TodoSerializer(todo, data=todo_data)

      if todo_serializer.is_valid():
        todo_serializer.save()
        return SuccessResponse.OK(todo_serializer.data)

      return ErrorResponse.BAD_REQUEST(todo_serializer.errors)
    except:
      return ErrorResponse.BAD_REQUEST('The user does not exist')


  elif request.method == 'DELETE':
    try:
      todo = Todo.objects.get(id=pk)
      todo.delete()
      return SuccessResponse.NO_CONTENT()
    except:
      return ErrorResponse.INTERNAL_SERVER_ERROR()
