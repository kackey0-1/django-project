from django.urls import path

from . import views

app_name = 'projects'
urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('detail/<int:project_id>', views.detail, name='detail'),
    path('edit/<int:project_id>', views.edit, name='edit'),
    path('apply/<int:project_id>', views.apply, name='apply'),
    path('cancel/<int:project_id>', views.cancel, name='cancel'),
]
