from django.shortcuts import render
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework import generics , viewsets , status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
User = get_user_model()


# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]
    

class RegisterViewset(viewsets.ViewSet):
    queryset= User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors,status=400)