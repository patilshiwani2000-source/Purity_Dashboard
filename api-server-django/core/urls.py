from django.contrib import admin
from django.urls import path, include
from api.views import home  # Import your home view

urlpatterns = [
    path('', home, name='home'),  # Add this for the root URL
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]