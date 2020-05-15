$(function() {
    if ($('.sales').prop('checked') == true) {
        $('.hidden_sales').prop('disabled', true);
    }

    if ($('.clients').prop('checked') == true) {
        $('.hidden_clients').prop('disabled', true);
    }

    if ($('.partner_companies').prop('checked') == true) {
        $('.hidden_partner_companies').prop('disabled', true);
    }

    // 工事データの権限がないならば商品発注書「照合済」を選択できなくする
    if ($('.constructions').prop('checked') == true) {
        $('.hidden_constructions').prop('disabled', true);
    } else {
        $('.merchandise_order').prop('checked',false);
        $('.hidden.merchandise_order').prop('disabled',false);
        $('.merchandise_order').prop('disabled',true);
        $('.merchandise_order_label').css('color','gray');
    }

    if ($('.merchandise_order').prop('checked') == true) {
        $('.hidden_merchandise_order').prop('disabled', true);
    }

    if ($('.accounting').prop('checked') == true) {
        $('.hidden_accounting').prop('disabled', true);
    }



    $('input[name="sales"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_sales').prop('disabled', true);
        } else {
            $('.hidden_sales').prop('disabled', false);
        }
    });

    $('input[name="clients"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_clients').prop('disabled', true);
        } else {
            $('.hidden_clients').prop('disabled', false);
        }
    });

    $('input[name="partner_companies"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_partner_companies').prop('disabled', true);
        } else {
            $('.hidden_partner_companies').prop('disabled', false);
        }
    });

    // 工事データ権限がないものには商品データ「照合済み」編集権限を与えない。
    $('input[name="constructions"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_constructions').prop('disabled', true);
            $('.merchandise_order').prop('disabled', false);
            $('.merchandise_order_label').css('color',"black");
        } else {
            $('.hidden_constructions').prop('disabled', false);
            $('.hidden_merchandise_order').prop('disabled', false);
            $('.merchandise_order').prop('checked', false);
            $('.merchandise_order').prop('disabled', true);
            $('.merchandise_order_label').css('color',"gray");
        }
    });

    $('input[name="accounting"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_accounting').prop('disabled', true);
        } else {
            $('.hidden_accounting').prop('disabled', false);
        }
    });

    $('input[name="merchandise_order"]').click(function() {
        if ($(this).prop('checked') == true) {
            $('.hidden_merchandise_order').prop('disabled', true);
        } else {
            $('.hidden_merchandise_order').prop('disabled', false);
        }
    });

    $('.btn-update').click(function() {
        $('.error').remove();
        var name = $('input[name="name"]').val();
        var name_len = name.length;
        var email = $('input[name="email"]').val();
        var checked_count = $('input[type="checkbox"]:checked').length;
        var reg = new RegExp(/[!"#$%&'()\*\,\:;<=>\[\\\]^`{|}~]/g);
        var reg2 = new RegExp(/[?\+\.\_\-\/]{2,}/);
        var reg3 = new RegExp(/^[?\+\.\_\-\/]/);
        var reg4 = new RegExp(/[?\+\.\_\-\/]$/);

        var email_front = email.split(/@/);
        if (!name) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }else if (name_len > 50) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>50文字以内で入力してください。</div>");
        }


        if (email.match(reg)){
            alert("間違ったメアドです");
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>無効なメールアドレスです。</div>");
        }
        else if (email.match(reg2)){
            alert("間違ったメアドです");
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>記号を2回以上連続で入れないでください。</div>");
        }
        else if (email.match(reg3)){
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>メールアドレスの先頭に記号を入れないでください。</div>");

        }
        else if (email_front[0].match(reg4)){
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>@の直前に記号を入れないでください。</div>");

        }
        else if (email_front[0].length >64){
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>@の左側の文字数は64文字以内にしてください。</div>");

        }
        else if (email.length>256){
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>256文字以内で入力してください。</div>");

        }
        // if (!email) {
        //     $('input[name="email"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        // }


        // if (!checked_count) {
        //     $('#applications').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
        // }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }

        var result = window.confirm("保存します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });

    $('.btn-delete').click(function() {
        var result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });

    $('.btn-back').click(function() {
        var result = window.confirm("このページを離れます。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });

    
});

