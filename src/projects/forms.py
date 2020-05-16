from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ObjectDoesNotExist

from .models import Project


class RegisterForm(forms.ModelForm):
    """テスト登録画面用のフォーム"""
    id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    test_name = forms.CharField(
        label='テスト名',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'テスト名'}),
        required=True,
    )
    test_description = forms.CharField(
        label='テスト概要',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'テスト名'}),
        required=True,
    )
    test_count = forms.CharField(
        label='テスト回数',
        widget=forms.NumberInput(attrs={'placeholder': '',
                                        'maxlength': 11,
                                        'oninput': "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            }),
        required=True,
    )
    class Meta:
        # 利用するモデルクラスを指定
        model = Project
        # 利用するモデルのフィールドを指定
        fields = ('test_name', 'test_description', 'test_count',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
