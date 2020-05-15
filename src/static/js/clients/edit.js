$(function() {
    $j2('#datetimepicker').datetimepicker({
        lang:"ja",
        step:10
    });


    $('.btn-create').click(function() {
        $('.error').remove();

        var correspondence_date = $('input[name="correspondence_date"]').val();
        var correspondence_person = $('select[name="correspondence_person"]').val();
        var correspondence_person_len = $('select[name="correspondence_person"]').val().length;
        // var email = $('input[name="email"]').val();
        // var tel_len = $('input[name="tel"]').val().length;
        var tel_len2 = $('input[name="tel2"]').val().length;

        var reception_contents_len = $('textarea[name="reception_contents"]').val().length;
        var note_len = $('textarea[name="note"]').val().length;
        
        if (!correspondence_date) {
            $('input[name="correspondence_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        if (!correspondence_person) {
            $('select[name="correspondence_person"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (correspondence_person_len > 20) {
            $('select[name="correspondence_person"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        }

        // if (!email) {
        //     $('input[name="email"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        // }

        // if (tel_len) {
        //     if (tel_len > 11 || tel_len < 10) {
        //         $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>10〜11桁以内で入力してください。</div>");
        //     }
        // }
        if (tel_len2) {
            if (tel_len2 > 11 || tel_len2 < 10) {
                $('input[name="tel2"]').parent().append("<div style='color: red;' class='error'>10〜11桁以内で入力してください。</div>");
            }
        }

        if (reception_contents_len) {
            if (reception_contents_len > 2000) {
                $('textarea[name="reception_contents"]').parent().append("<div style='color: red;' class='error'>2000文字以内で入力してください。</div>");
            }
        }

        if (note_len) {
            if (note_len > 1000) {
                $('textarea[name="note"]').parent().append("<div style='color: red;' class='error'>2000文字以内で入力してください。</div>");
            }
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }

        var result = window.confirm("追加します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    })

    $('.btn-update').click(function() {
        $('.error').remove();
        var name = $('input[name="name"]').val();
        var name_len = name.length;
        var kana = $('input[name="kana"]').val();
        var kana_len = kana.length;
        var customer_type = $('select[name="customer_type"]').val();
        var honorific = $('select[name="honorific"]').val();
        var code_len = $('input[name="code"]').val().length;
        var tel_len = $('input[name="tel"]').val().length;
        var fax_len = $('input[name="fax"]').val().length;
        var assigned_base_len = $('input[name="assigned_base"]').val().length;
        var person_in_charge_name_len = $('input[name="person_in_charge_name"]').val().length;
        var person_in_charge_tel_len = $('input[name="person_in_charge_tel"]').val().length;
        var person_in_charge_name1_len = $('select[name="person_in_charge_name1"]').val().length;
        var person_in_charge_name2_len = $('select[name="person_in_charge_name2"]').val().length;
        var industry_len = $('input[name="industry"]').val().length;
        var remarks_len = $('textarea[name="remarks"]').val().length;


        
        if (!name) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (name_len > 10) {
            $('input[name="name"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
        }

        if (!kana) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (!kana.match(/^[\u3040-\u309f\-\ー]+$/)) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>ひらがなで入力してください。</div>");
        } else if (kana_len > 10) {
            $('input[name="kana"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
        }

        if (!customer_type) {
            $('select[name="customer_type"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        if (!honorific) {
            $('select[name="honorific"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        if (code_len) {
            if (code_len > 10) {
                $('input[name="code"]').parent().append("<div style='color: red;' class='error'>10桁以内で入力してください。</div>");  
            }
        }

        if (tel_len) {
            if (tel_len > 11 || tel_len < 10) {
                $('input[name="tel"]').parent().append("<div style='color: red;' class='error'>10〜11桁以内で入力してください。</div>");
            }
        }

        if (fax_len) {
            if (fax_len > 11 || fax_len < 10) {
                $('input[name="fax"]').parent().append("<div style='color: red;' class='error'>10〜11桁以内で入力してください。</div>");
            }
        }

        if (assigned_base_len) {
            if (assigned_base_len > 20) {
                $('input[name="assigned_base"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
            }
        }

        if (person_in_charge_name_len) {
            if (person_in_charge_name_len > 10) {
                $('input[name="person_in_charge_name"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
            }
        }

        if (person_in_charge_tel_len) {
            if (person_in_charge_tel_len > 11 || person_in_charge_tel_len < 10) {
                $('input[name="person_in_charge_tel"]').parent().append("<div style='color: red;' class='error'>10〜11桁以内で入力してください。</div>");
            }
        } 

        if (person_in_charge_name1_len) {
            if (person_in_charge_name1_len > 10) {
                $('input[name="person_in_charge_name1"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
            }
        }

        if (person_in_charge_name2_len) {
            if (person_in_charge_name2_len > 10) {
                $('input[name="person_in_charge_name2"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
            }
        }

        if (industry_len) {
            if (industry_len > 10) {
                $('input[name="industry"]').parent().append("<div style='color: red;' class='error'>10文字以内で入力してください。</div>");
            }
        }

        if (remarks_len) {
            if (remarks_len > 100) {
                $('textarea[name="remarks"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
            }
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

    $('.btn-inquiry-delete').click(function() {
        var result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });

    $('.btn-send-email').click(function() {
        var result = window.confirm("メールを送信します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
});


