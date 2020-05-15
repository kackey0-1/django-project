"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 2.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import sys

# これでキャッシュファイルが生成されなくなる？らしい
sys.dont_write_bytecode = True

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_NAME = os.path.basename(BASE_DIR)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'c72f8m&)w6f(63cfr-7-jpm^n50a_u+)uh1r7)!w&pzmu5=9s('

# SECURITY WARNING: don't run with debug turned on in production!
# 本番稼働時にはセキュリティ面を考慮して必ずこの DEBUG を False にしておくこと
# DEBUG = True
DEBUG = False

ALLOWED_HOSTS = ['*']

MEDIA_ROOT = os.path.join(BASE_DIR, 'media_root')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',

    # My applications
    'accounts.apps.AccountsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.static',
            ],
            'libraries': {
                'parse': 'app.modules.filters.common_filter.parse',
                'calc': 'app.modules.filters.common_filter.calc',
            },
            'builtins': [
               'bootstrap4.templatetags.bootstrap4',
            ]
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
        'TIMEOUT': 60,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}

# パスワードハッシュ化設定
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
]

##################
# Authentication #
##################
AUTH_USER_MODEL = 'accounts.CustomUser'


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'ja-JP'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_ROOT = 'static'
STATIC_URL = '/static/'
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# ログインページURL
LOGIN_URL = '/accounts/login/'
# ログイン後のリダイレクト先
LOGIN_REDIRECT_URL = '/accounts/profile'
# ログアウト後のリダイレクト先
LOGOUT_REDIRECT_URL = '/accounts/login/'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'log/debug.log',
        },
    },
    'loggers': {
        'parso': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    }
}

# For Application Logic
# https://docs.djangoproject.com/en/3.0/ref/contrib/humanize/
NUMBER_GROUPING = 3
# TAX RATE(消費税計算用の定数)
# decimalにて消費税計算を実装するため文字列として定義
TAX_RATE = '0.1'
PDF_PATH = "test-contents"
DATA_UPLOAD_MAX_NUMBER_FIELDS = 3000

"""
# メール設定
# Gmail 以外の場合 EMAIL_HOST,EMAIL_PORT の変更が必要
# EMAIL_HOST_USER に送信元のメールアドレスを入力する
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = True
"""
