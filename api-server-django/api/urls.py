# api/urls.py
from django.urls import path
from .views import UserLoginView,UserRegisterView # This should match the class name in views.py

urlpatterns = [
    path("users/login/", UserLoginView.as_view(), name="user_login"),
    path("users/register/", UserRegisterView.as_view(), name="user_register"),  # <-- add this line
]