from django.urls import path

from . import views

app_name = 'engineers'
urlpatterns = [
    path('', views.index, name='index'),
    path('put', views.put, name='put'),
    path('<int:user_id>/', views.detail, name='detail'),
]
