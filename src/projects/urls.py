from django.urls import path

from . import views

app_name = 'projects'
urlpatterns = [
    path('', views.index, name='index'),
    path('put/', views.put, name='put'),
    path('<int:project_id>/', views.detail, name='detail'),
    # path('/', views.checkout, name='checkout'),
]
