from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    list_display = ('name', 'created_at')
