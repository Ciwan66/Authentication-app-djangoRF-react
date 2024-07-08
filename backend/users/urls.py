from django.urls import path
from .views import  RegisterViewset
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('register',RegisterViewset,basename='register')


urlpatterns = router.urls
