import logging

from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
User = get_user_model()

logger = logging.getLogger(__name__)
# Your existing home function
def home(request):
    return HttpResponse("Django API Server is running!")

@method_decorator(csrf_exempt, name='dispatch')
class UserLoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            return JsonResponse({
                "success": True,
                "msg": "Login successful",
                "user": {
                    "email": data.get('email', 'test@appseed.us'),
                    "name": "Test User"
                },
                "token": "sample_token_123"
            })
        except json.JSONDecodeError:
            return JsonResponse({
                "success": False,
                "msg": "Invalid JSON data"
            }, status=400)
        except Exception as e:
            # Don't leak internal exceptions (DB hostnames, stack traces, etc.) to clients.
            logger.exception("Login failed")
            return JsonResponse(
                {
                    "success": False,
                    "msg": "Server is temporarily unavailable. Please try again.",
                },
                status=500,
            )

@method_decorator(csrf_exempt, name='dispatch')
class UserRegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)

            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if not username or not email or not password:
                return JsonResponse({
                    "success": False,
                    "msg": "All fields (username, email, password) are required"
                }, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({
                    "success": False,
                    "msg": "Username already exists"
                }, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    "success": False,
                    "msg": "Email already registered"
                }, status=400)

            user = User.objects.create(
                username=username,
                email=email,
               password=password 
            )

            return JsonResponse({
                "success": True,
                "msg": "User registered successfully"
            })

        except Exception as e:
            # Don't leak internal exceptions (DB hostnames, stack traces, etc.) to clients.
            logger.exception("Registration failed")
            return JsonResponse(
                {
                    "success": False,
                    "msg": "Server is temporarily unavailable. Please try again.",
                },
                status=500,
            )