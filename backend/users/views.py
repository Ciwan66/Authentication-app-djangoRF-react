from django.shortcuts import render
from django.contrib.auth import get_user_model , authenticate
from .serializers import RegisterSerializer , LoginSerialzer
from rest_framework import generics , viewsets , status
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken
User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    queryset= User.objects.all()
    serializer_class = LoginSerialzer
    permission_classes = [AllowAny]

    def create(self , request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request , email=email , password = password)
            if user:
                _,token = AuthToken.objects.create(user)
                return Response({
                    "user" : self.serializer_class(user).data,
                    "token" : token
                })
            else:
                return Response({"error":"Invalid credentials"} ,status=401)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

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
        
class UserViewset(viewsets.ViewSet):
    queryset= User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = self.queryset.all()
        serializer = self.serializer_class(queryset , many=True)
        return Response(serializer.data)