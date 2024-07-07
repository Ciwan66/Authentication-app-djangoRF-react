from django.db import models
from django.contrib.auth.models import AbstractUser , BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self,email , password=None ,**extra_fields):
        if not email:
             raise ValueError("Email is a required field")
        
        email = self.normalize_email(email)
        
        user= self.model(email=email , **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email, password=None,**extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True ,max_length=100)
    username = models.CharField(max_length=100 , blank=True , null=True)
    birthday = models.DateField(blank=True , null=True)

    
    objects = CustomUserManager()
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
