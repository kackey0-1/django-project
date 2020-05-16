from django.urls import path

from . import views

app_name = 'projects'
urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    # path('', views.detail, name='detail'),
    # path('/', views.checkout, name='checkout'),
]
