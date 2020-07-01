import logging

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import View

from app.modules import ProjectsModules as p

logger = logging.getLogger(__name__)

class IndexView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        keyword = request.GET.get('keyword')
        queryset = p.search(keyword)
        context = {
            'keyword': keyword,
            'application_list': queryset,
        }
        return render(request, 'applications/application_list.html', context)
index = IndexView.as_view()

