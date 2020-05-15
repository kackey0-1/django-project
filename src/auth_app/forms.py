from django import forms
from .models import Users

""" 新規登録フォーム """
class RegisterForm(forms.Form):
    name = forms.CharField(
        label = '名前',
        max_length = 255,
        required = True,
        widget = forms.TextInput(attrs={'class':'form-control'})
    )

    kana = forms.CharField(
        label = 'ふりがな',
        max_length = 255,
        required = True,
        widget = forms.TextInput(attrs={'class':'form-control'})
    )

    email = forms.EmailField(
        label = 'メールアドレス',
        max_length = 255,
        required = True,
        widget = forms.TextInput(attrs={'class':'form-control'})
    )

    tel = forms.CharField(
        label = '電話番号',
        max_length = 11,
        required = True,
        widget = forms.TextInput(attrs={'class':'form-control'})
    )

    password = forms.CharField(
        label = 'パスワード',
        strip = False,
        required = True,
        widget = forms.PasswordInput(attrs={'class':'form-control'}),
    )

    confirm_password = forms.CharField(
        label = '確認用パスワード',
        strip = False,
        required = True,
        widget = forms.PasswordInput(attrs={'class':'form-control'}),
    )

""" ログインフォーム """
class LoginForm(forms.Form):
    email = forms.EmailField(
        label = 'メールアドレス',
        max_length = 255,
        required = True,
        widget = forms.TextInput(attrs={'class':'form-control'})
    )

    password = forms.CharField(
        label = 'パスワード',
        strip = False,
        required = True,
        widget = forms.PasswordInput(attrs={'class':'form-control'})
    )

""" バリデーション？ """
def clean(self):
    name = self.cleaned_data.get('name')
    password = self.cleaned_data.get('password')
    try:
        user = Users.objects.get(name=name)
    except ObjectDoesNotExist:
        raise forms.ValidationError('正しいユーザー名を入力してください')
    if not user.check_password(password):
        raise forms.ValidationError('正しいパスワードを入力してください')

