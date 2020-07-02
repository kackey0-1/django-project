from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ObjectDoesNotExist

from accounts.models import CustomUser
from projects.models import Project, Client
from engineers.models import Partner, Skill


class EntryForm(forms.ModelForm):
    """案件登録用のフォーム"""
    class Meta:
        # 利用するモデルクラスを指定
        model = CustomUser
        # 利用するモデルのフィールドを指定
        fields = ('username', 'password', 'last_name', 'first_name', 'email', 'tel', 'description', 'skills',)

    name = forms.CharField(
        label='案件名',
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '案件名'}),
    )
    description = forms.CharField(
        label='案件詳細',
        max_length=2000,
        required=True,
        strip=False,
        widget=forms.Textarea(attrs={'placeholder': '案件詳細'}),
    )
    skills = forms.ModelMultipleChoiceField(
        label='資格',
        queryset=Skill.objects,
        widget=forms.SelectMultiple()
    )
    location = forms.CharField(
        label='場所',
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '場所'}),
    )
    project_date = forms.DateField(
        label='案件日',
        required=True,
        widget=forms.DateInput(attrs={'placeholder': '案件開始日', 'type': 'date'}),
    )
    start_time = forms.TimeField(
        label='開始時刻',
        required=True,
        widget=forms.TimeInput(attrs={'placeholder': '開始時刻', 'type': 'time'}),
    )
    end_time = forms.TimeField(
        label='終了時刻',
        required=True,
        widget=forms.TimeInput(attrs={'placeholder': '終了時刻', 'type': 'time'}),
    )
    partners = forms.ModelMultipleChoiceField(
        label='取引先',
        required=True,
        queryset=Partner.objects,
        widget=forms.SelectMultiple()
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'


class EditForm(forms.ModelForm):
    """案件編集用のフォーム"""

    class Meta:
        # 利用するモデルクラスを指定
        model = CustomUser
        # 利用するモデルのフィールドを指定
        fields = ('id', 'username', 'password', 'last_name', 'first_name', 'email', 'tel', 'description', 'skills',)

    id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    name = forms.CharField(
        label='案件名',
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '案件名'}),
    )
    description = forms.CharField(
        label='案件詳細',
        max_length=2000,
        required=True,
        strip=False,
        widget=forms.Textarea(attrs={'placeholder': '案件詳細'}),
    )
    skills = forms.ModelMultipleChoiceField(
        label='資格',
        queryset=Skill.objects,
        widget=forms.SelectMultiple()
    )
    location = forms.CharField(
        label='場所',
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '場所'}),
    )
    project_date = forms.DateField(
        label='案件日',
        required=True,
        widget=forms.DateInput(attrs={'placeholder': '案件開始日', 'type': 'date'}),
    )
    start_time = forms.TimeField(
        label='開始時刻',
        required=True,
        widget=forms.TimeInput(attrs={'placeholder': '開始時刻', 'type': 'time'}),
    )
    end_time = forms.TimeField(
        label='終了時刻',
        required=True,
        widget=forms.TimeInput(attrs={'placeholder': '終了時刻', 'type': 'time'}),
    )
    partners = forms.ModelMultipleChoiceField(
        label='取引先',
        required=True,
        queryset=Partner.objects,
        widget=forms.SelectMultiple()
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'
