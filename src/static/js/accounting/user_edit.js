$(function() {
    $('.btn-update').click(function() {
        $('.error').remove();
        var name = $('input[name="name"]').val();
        var name_len = name.length;
        var kana = $('input[name="kana"]').val();
        var kana_len = kana.length;
        var email = $('input[name="email"]').val();
        var code = $('input[name="code"]').val();
        var code_len = code.length;
        var city = $('input[name="city"]').val();
        var street = $('input[name="street"]').val();
        var tel = $('input[name="tel"]').val();
        var tel_len = tel.length;
        var emergency_contact_name = $('input[name="emergency_contact_name"]').val().length;
        var emergency_contact_email = $('input[name="emergency_contact_email"]').val();
        var relationship = $('input[name="relationship"]').val().length;
        var emergency_contact_address = $('input[name="emergency_contact_address"]').val().length;
        var emergency_contact_tel = $('input[name="emergency_contact_tel"]').val();
        var emergency_contact_tel_len = $('input[name="emergency_contact_tel"]').val().length;
        var qualification = $('textarea[name="qualification"]').val().length;
        var qualification_remarks = $('textarea[name="qualification_remarks"]').val().length;
        var remarks = $('textarea[name="remarks"]').val().length;
        var reg = new RegExp(/[!"#$%&'()\*\,\:;<=>\[\\\]^`{|}~]/g);
        var reg2 = new RegExp(/[?\+\.\_\-\/]{2,}/);
        var reg3 = new RegExp(/^[?\+\.\_\-\/]/);
        var reg4 = new RegExp(/[?\+\.\_\-\/]$/);

        var reg5 = new RegExp(/[\-]/);
        var reg6 = new RegExp(/^[0-9]+$/);

        var email_front = email.split(/@/);
        var emergency_contact_email_front = emergency_contact_email.split(/@/);

        
        if (!name) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (name_len > 20) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        }

        if (!kana) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (!kana.match(/^[\u3040-\u309f\-\ー]+$/)) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>ひらがなで入力してください。</div>");
        } else if (kana_len > 20) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        }

        if (!code) {
            $('input[name="code"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (code_len != 8) {
            $('input[name="code"]').parent().append("<div style='color: red;' class='error'>8桁で入力してください。</div>");
        }

        // if (!city) {
        //     $('input[name="city"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        // }


        // if (!street) {
        //     $('input[name="street"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        // }
        if (tel.match(reg5)){
            var tel_sp = tel.split(/-/);
            var tel_length = tel_sp.length;
            for (let i = 0; i < tel_length; i++) {
                if (!tel_sp[i].match(reg6)){
                    $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>数字または-のみにしてください。</div>");
                    break;
                }
            }
        } else {
            if (!tel.match(/^[0-9]+$/)){
                    $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>数字または-のみにしてください。</div>");

            }
        }


        // if (!street) {
        //     $('input[name="street"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        // }


        if (!tel) {
            $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (tel_len > 13 || tel_len < 10) {
            $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>10〜13桁で入力してください。</div>");
        }

        if (!email) {
            $('input[name="email"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
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

        if (emergency_contact_name > 20) {
            $('input[name="emergency_contact_name"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        }

        if (emergency_contact_email.match(reg)){
            $('input[name="emergency_contact_email"]').parent().append("<div style='color: red;' class='error'>無効なメールアドレスです。</div>");
        }
        else if (emergency_contact_email.match(reg2)){
            $('input[name="emergency_contact_email"]').parent().append("<div style='color: red;' class='error'>記号を2回以上連続で入れないでください。</div>");

        }
        else if (emergency_contact_email.match(reg3)){
            $('input[name="emergency_contact_email"]').parent().append("<div style='color: red;' class='error'>メールアドレスの先頭に記号を入れないでください。</div>");


        }
        else if (emergency_contact_email_front[0].match(reg4)){
            $('input[name="emergency_contact_email"]').parent().append("<div style='color: red;' class='error'>@の直前に記号を入れないでください。</div>");

        }
        else if (emergency_contact_email_front[0].length >64){
            $('input[name="emergency_contact_email"]').parent().append("<div style='color: red;' class='error'>@の左側の文字数は64文字以内にしてください。</div>");

        }

        if (relationship > 20) {
            $('input[name="relationship"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        }

        if (emergency_contact_address > 80) {
            $('input[name="emergency_contact_address"]').parent().append("<div style='color: red;' class='error'>80文字以内で入力してください。</div>");
        }

        if (emergency_contact_tel) {
        //     if (emergency_contact_tel != 11) {
        //         $('input[name="emergency_contact_tel"]').parent().append("<div style='color: red;' class='error'>11桁で入力してください。</div>");
        //     }
        // }
            if (emergency_contact_tel.match(reg5)){
                var tel_sp = emergency_contact_tel.split(/-/);
                var tel_length = tel_sp.length;
                for (let i = 0; i < tel_length; i++) {
                    if (!tel_sp[i].match(reg6)){
                        $('input[name="emergency_contact_tel"]').parent().append("<div style='color: red;' class='error'>数字または-のみにしてください。</div>");
                        break;
                    }
                }
            } else {
                if (!emergency_contact_tel.match(/^[0-9]+$/)){
                        $('input[name="emergency_contact_tel"]').parent().append("<div style='color: red;' class='error'>数字または-のみにしてください。</div>");

                }
            }
            if (emergency_contact_tel_len > 13 || emergency_contact_tel_len < 10) {
                $('input[name="emergency_contact_tel"]').parent().append("<div style='color: red;' class='error'>10〜13桁以内で入力してください。</div>");
            }
        }

        if (remarks > 100) {
            $('textarea[name="remarks"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
        }

        if (qualification > 100) {
            $('textarea[name="qualification"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
        }

        if (qualification_remarks > 100) {
            $('textarea[name="qualification_remarks"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
        }


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