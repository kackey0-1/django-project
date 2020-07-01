from . import views
from django.urls import path

app_name = 'applications'
urlpatterns = [
    path('', views.index, name='index'),
    # path('/', views.checkout, name='checkout'),
]
