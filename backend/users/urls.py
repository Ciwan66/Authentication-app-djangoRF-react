from django.urls import path, include
from .views import  RegisterViewset , LoginViewset , UserViewset
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('register',RegisterViewset,basename='register')
router.register('login',LoginViewset,basename='login')
router.register('user',UserViewset,basename='user')


urlpatterns = router.urls

