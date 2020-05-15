$(function() {
    $('.btn-search').click(function() {
        $('.error').remove();
        var kana = $('input[name="kana"]').val();
        var kana_len = kana.length;
        if (kana) {
            if (!kana.match(/^[\u3040-\u309f]+$/)) {
                $('#search').parent().append("<div style='color: red;' class='error'>ひらがなで入力してください。</div>");
            } else if (kana_len > 20) {
                $('#search').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
            }
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }
    });

    $('.btn-update').click(function() {
        $('.error').remove();
        var password = $('input[name="password"]').val()
        var password_len = $('input[name="password"]').val().length;

        if (!password) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>入力してください。</div>");
            return false;
        } else if (!password.match(/^[A-Za-z0-9]*$/)) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>半角英数字で入力してください。</div>");
        } else if (password_len < 6 || password_len > 8) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>6〜8桁の半角英数字で入力してください。</div>");
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }

        var result = window.confirm("パスワードを変更します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
});