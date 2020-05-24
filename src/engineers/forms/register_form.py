from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ObjectDoesNotExist

from accounts.models import CustomUser
from engineers.models import Skill


class RegisterForm(forms.ModelForm):
    """ユーザー登録画面用のフォーム"""
    # formfield: https://docs.djangoproject.com/en/3.0/ref/forms/fields/
    # widget: https://docs.djangoproject.com/en/3.0/ref/forms/widgets/#selectmultiple
    class Meta:
        # 利用するモデルクラスを指定
        model = CustomUser
        # 利用するモデルのフィールドを指定
        fields = ('id', 'username', 'password', 'last_name', 'first_name', 'email', 'tel', 'description', 'skills',)
    
    id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    username = forms.CharField(
        label='ユーザー名',
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'ユーザー名'}),
    )
    password = forms.CharField(
        label='パスワード',
        required=True,
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'パスワード'}),
    )
    last_name = forms.CharField(
        label='姓（山田）',
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '姓（山田）'}),
    )
    first_name = forms.CharField(
        label='名（太郎）',
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '名（太郎）'}),
    )
    email = forms.CharField(
        label='メールアドレス',
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'メールアドレス'}),
    )
    tel = forms.CharField(
        label='TEL',
        required=True,
        widget=forms.NumberInput(attrs={'placeholder': '電話番号'}),
    )
    description = forms.CharField(
        label='詳細',
        required=False,
        widget=forms.Textarea(attrs={'placeholder': '詳細'}),
    )
    skills = forms.ModelMultipleChoiceField(
        label='所有資格',
        required=True,
        queryset=Skill.objects,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'form-control'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'

    def clean_username(self):
        value = self.cleaned_data['username']
        if len(value) < 3:
            raise forms.ValidationError(
                '%(min_length)s文字以上で入力してください', params={'min_length': 3})
        return value

    def clean_email(self):
        value = self.cleaned_data['email']
        return value

    def clean_tel(self):
        value = self.cleaned_data['tel']
        try:
            int(value)
        except:
            raise forms.ValidationError('数値%(min_length)s桁で入力してください', params={'min_length': 11})
        if len(value) < 11:
            raise forms.ValidationError('%(min_length)s文字で入力してください', params={'min_length': 11})
        return value

    def clean_password(self):
        value = self.cleaned_data['password']
        return value

    # def clean(self):
    #     password = self.cleaned_data['password']
    #     password2 = self.cleaned_data['password2']
    #     if password != password2:
    #         raise forms.ValidationError("パスワードと確認用パスワードが合致しません")
    #     # ユニーク制約を自動でバリデーションしてほしい場合は super の clean() を明示的に呼び出す
    #     super().clean()

# https://narito.ninja/blog/detail/33/
# skillsInlineFormSet = forms.inlineformset_factory(
#     CustomUser, CustomUser.skills.through, fields='__all__', can_delete=False
# )
