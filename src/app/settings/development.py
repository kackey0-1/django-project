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
# import pymysql
from app.settings.common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'c72f8m&)w6f(63cfr-7-jpm^n50a_u+)uh1r7)!w&pzmu5=9s('

# SECURITY WARNING: don't run with debug turned on in production!
# 本番稼働時にはセキュリティ面を考慮して必ずこの DEBUG を False にしておくこと
DEBUG = True

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# Static File
STATIC_ROOT = ''
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static"),
                    '/code/static']

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    # ログフォーマット
    'formatters': {
        # 開発用
        'develop': {
            'format': '%(asctime)s [%(levelname)s] %(pathname)s:%(lineno)d '
                      '%(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'formatter': 'develop',
            'filename': '/logs/debug.log',
            'when': 'D',  # this specifies the interval
            'interval': 1,  # defaults to 1, only necessary for other values
            'backupCount': 10,  # how many backup file to keep, 10 days
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'daphne': {
            'handlers': ['file'],
            'level': 'DEBUG'
        },
        # 発行されるSQL文を出力するための設定
        # 'django.db.backends': {
        #     'handlers': ['console'],
        #     'level': 'DEBUG',
        #     'propagate': False,
        # },
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    }
}


# pymysql.install_as_MySQLdb()
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_app',
        'USER': 'django_app',
        'PASSWORD': 'django_app',
        'HOST': 'db',
        'PORT': '3306',
    }
}


# メール設定
# Gmail 以外の場合 EMAIL_HOST,EMAIL_PORT の変更が必要
# EMAIL_HOST_USER に送信元のメールアドレスを入力する
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = '**************@gmail.com'
EMAIL_HOST_PASSWORD = '***************'
EMAIL_USE_TLS = True

SHELL_PLUS = "ipython"
IPYTHON_ARGUMENTS = [
  '--profile-dir', '/code/ipython_profile'
]

# Redisの設定
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [('redis', 6379)]
        }
    }
}

CHAT_DOMAIN = 'localhost:3001'
