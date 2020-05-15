$(function() {
    $('.btn-choice-delete').click(function() {
        var checked = $('input[type="checkbox"]:checked').length;

        if (!checked) {
            var result = window.confirm("削除する業者データを選択してください。");
            return false;
        }

        var result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
    $('.search_btn').click(function() {
        $('.error4').remove();
        // $('div[name="space"]').css('margin-top','-100px');

        var company_name_len = $('input[name="company_name"]').val().length;
        var company_tel_len = $('input[name="company_tel"]').val().length;
        var company_tel = $('input[name="company_tel"]').val();
        var head_office_location_len = $('input[name="head_office_location"]').val().length;
        var reg5 = new RegExp(/[\-]/);
        var reg6 = new RegExp(/^[0-9]+$/);
        

        if (head_office_location_len > 150) {
            // $('input[name="head_office_location"]').parent().append("<div style='color: red;' class='error'>150字以内で入力してください。</div>");
            $('div[name="error3"]').append("<div style='color: red; margin-left: 250px; display: block;' class='error4'>150字以内で入力してください。</div>");
            $('div[name="space"]').css('margin-top','150px');


        }
        if (company_tel_len > 13) {
            // $('input[name="company_tel"]').parent().append("<div style='color: red;' class='error'>100字以内で入力してください。</div>");
            $('div[name="error3"]').append("<div style='color: red;' class='error4'>13字以内で入力してください。</div>");
            $('div[name="space"]').css('margin-top','150px');


        }
        if (company_tel) {
            if (company_tel.match(reg5)){
                var tel_sp = company_tel.split(/-/);
                var tel_length = tel_sp.length;
                for (i = 0; i < tel_length; i++) {
                    if (!tel_sp[i].match(reg6)){
                        $('div[name="error3"]').append("<div style='color: red;' class='error4'>数字または-のみにしてください。</div>");
                        $('div[name="space"]').css('margin-top','150px');
                        break;
                    }
                }
            } else {
                if (!company_tel.match(/^[0-9]+$/)){
                        // $('input[name="company_tel"]').parent().append("<div style='color: red;' class='error'>数字または-のみにしてください。</div>");
                        $('div[name="error3"]').append("<div style='color: red;' class='error4'>数字または-のみにしてください。</div>");
                        $('div[name="space"]').css('margin-top','150px');
                }
            }
        }
        if (company_name_len > 100) {
            $('div[name="error2"]').append("<div style='color: red;' class='error4'>100字以内で入力してください</div>");
            $('div[name="space"]').css('margin-top','150px');
        }

        var error = $('div').hasClass('error4');
        if (error) {
            return false;
        }

        


    });

});