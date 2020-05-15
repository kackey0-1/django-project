$(function() {
	$('.btn-login').click(function() {
        $('.error').remove();
        var email = $('input[name="email"]').val();
		var password = $('input[name="password"]').val();
        var password_len = $('input[name="password"]').val().length;
        
        if (!email) {
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>入力してください。</div>");
        }

        if (!password) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>入力してください。</div>");  
        } else if (!password.match(/^[A-Za-z0-9]*$/)) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>半角英数字で入力してください。</div>");
        } else if (password_len < 6 || password_len > 8) {
            $('input[name="password"]').parent().append("<div style='color: red;' class='error'>6〜8桁の半角英数字で入力してください。</div>");
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }
	});
});