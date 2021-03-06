from .models import Room, Message
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.template import loader
from django.shortcuts import redirect, render
from django.urls import reverse
from django.conf import settings


class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        room_list = Room.objects.order_by('-created_at')[:5]
        context = {
            'room_list': room_list,
        }
        return render(request, 'chat/index.html', context)


class ChatView(LoginRequiredMixin, View):
    def get(self, request, room_name, *args, **kwargs):
        messages = Message.objects.filter(room__name=room_name).order_by('created_at')[:50]
        room = Room.objects.filter(name=room_name)[0]
        context = {
            'messages': messages,
            'room': room,
            'username': request.user.username,
            'chat_domain': settings.CHAT_DOMAIN,
        }
        return render(request, 'chat/chat_room_new.html', context)


class RoomView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        name = request.POST.get("room_name")
        room = Room.objects.create(name=name)
        return redirect(reverse('chat:chat_room', args=[name]))


index = IndexView.as_view()
chat = ChatView.as_view()
room = RoomView.as_view()
