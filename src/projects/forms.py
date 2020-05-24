from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ObjectDoesNotExist

from .models import Project, Client

class EntryForm(forms.ModelForm):
    """案件登録画面用のフォーム"""
    id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    name = forms.CharField(
        label='プロジェクト名',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'プロジェクト名'}),
        required=True,
    )
    description = forms.CharField(
        label='プロジェクト詳細',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'プロジェクト詳細'}),
        required=True,
    )
    required_skill = forms.CharField(
        label='資格',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': '資格'}),
        required=True,
    )

    class Meta:
        # 利用するモデルクラスを指定
        model = Project
        # 利用するモデルのフィールドを指定
        fields = ('id', 'name', 'description', 'required_skill',)

    def __init__(self, *args, **kwargs):
        super(EntryForm, self).__init__(*args, **kwargs)
