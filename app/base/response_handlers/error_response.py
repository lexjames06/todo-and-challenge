from rest_framework import status
from rest_framework.response import Response

class ErrorResponse:
  def BAD_REQUEST(message):
    return Response({'message': message, 'code': 400, 'status': 'HTTP_400_BAD_REQUEST'}, status=status.HTTP_400_BAD_REQUEST)
  
  def UNAUTHORIZED(message):
    return Response({'message': message, 'code': 401, 'status': 'HTTP_401_UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)
  
  def FORBIDDEN(message):
    return Response({'message': message, 'code': 403, 'status': 'HTTP_403_FORBIDDEN'}, status=status.HTTP_403_FORBIDDEN)

  def NOT_FOUND(message):
    return Response({'message': message, 'code': 404, 'status': 'HTTP_404_NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

  def INTERNAL_SERVER_ERROR():
    return Response({'message': 'Something went wrong, please try again', 'code':500, 'status': 'HTTP_500_INTERNAL_SERVER_ERROR'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
