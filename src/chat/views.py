from .models import Room, Message
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.template import loader
from django.shortcuts import redirect, render
from django.urls import reverse

class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        room_list = Room.objects.order_by('-created_at')[:5]
        context = {
            'room_list': room_list,
        }
        return render(request, 'chat/index.html', context)
index = IndexView.as_view()

class ChatView(LoginRequiredMixin, View):
    def get(self, request, room_name, *args, **kwargs):
        messages = Message.objects.filter(room__name=room_name).order_by('-created_at')[:50]
        room = Room.objects.filter(name=room_name)[0]
        context = {
            'messages': messages,
            'room': room
        }
        return render(request, 'chat/chat_room.html', context)
chat = ChatView.as_view()

class RoomView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        name = request.POST.get("room_name")
        room = Room.objects.create(name=name)
        return redirect(reverse('chat:chat_room', args=[name]))
room = RoomView.as_view()
