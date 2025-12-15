import os
import environ
from pathlib import Path
import dj_database_url

env = environ.Env(DEBUG=(bool, False))
BASE_DIR = Path(__file__).resolve().parent.parent

# Read .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env('SECRET_KEY', default='insecure-S#perS3crEt_007')
DEBUG = True  # Set to True for development
ALLOWED_HOSTS = ["*"]

ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# FORCE REMOTE DATABASE - Always use Render PostgreSQL
DEBUG = False
ALLOWED_HOSTS = [os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')]

DATABASES = {
    "default": dj_database_url.config(
        default="postgresql://dashboard_react:iMwQZc045vpliHqKdVlqbuzRXL0PWjm9@dpg-d4ts32muk2gs73c5vrl0-a.singapore-postgres.render.com:5432/dashboard_user",
        conn_max_age=600,
        ssl_require=True
    )
}

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "api.authentication.backends.ActiveSessionAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
}

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]