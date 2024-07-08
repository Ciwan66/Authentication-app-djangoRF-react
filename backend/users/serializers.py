from rest_framework import serializers
from .models import *
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model
User = get_user_model()

class LoginSerialzer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password',None)
        return ret
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email' , 'password' ]
        extra_kwargs = {'password': {'write_only':True}}
  

    def validate(self, attrs):
        password = attrs.get('password')
        try:
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError({'password': list(e.messages)})
        return attrs
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user