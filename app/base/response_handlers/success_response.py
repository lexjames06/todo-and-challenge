from rest_framework import status
from rest_framework.response import Response

class SuccessResponse:
  def OK(data):
    return Response(data, status=status.HTTP_200_OK)
  
  def CREATED(data):
    return Response(data, status=status.HTTP_201_CREATED)
  
  def NO_CONTENT():
    return Response(status=status.HTTP_204_NO_CONTENT)
