$(function() {
    $('input[name="large_industry[]"]').change(function() {
        var finishing = $('#finishing').prop('checked');
        var batch = $('#batch').prop('checked');
        var interior_finish = $('#interior-finish').prop('checked');
        var dismantling = $('#dismantling').prop('checked');
        var interior_construction = $('#interior-construction').prop('checked');
        var equipment_work = $('#equipment-work').prop('checked');
        var other = $('#other').prop('checked');

        if (finishing) {
            $('input[value="101"]').prop('checked', true);
            $('input[value="102"]').prop('checked', true);
            $('input[value="103"]').prop('checked', true);
        } else {
            $('input[value="101"]').prop('checked', false);
            $('input[value="102"]').prop('checked', false);
            $('input[value="103"]').prop('checked', false);
        }

        if (batch) {
            $('input[value="201"]').prop('checked', true);
        } else {
            $('input[value="201"]').prop('checked', false);
        }

        if (interior_finish) {
            $('input[value="301"]').prop('checked', true);
            $('input[value="302"]').prop('checked', true);
            $('input[value="303"]').prop('checked', true);
            $('input[value="304"]').prop('checked', true);
            $('input[value="305"]').prop('checked', true);
            $('input[value="306"]').prop('checked', true);
            $('input[value="307"]').prop('checked', true);
            $('input[value="308"]').prop('checked', true);
        } else {
            $('input[value="301"]').prop('checked', false);
            $('input[value="302"]').prop('checked', false);
            $('input[value="303"]').prop('checked', false);
            $('input[value="304"]').prop('checked', false);
            $('input[value="305"]').prop('checked', false);
            $('input[value="306"]').prop('checked', false);
            $('input[value="307"]').prop('checked', false);
            $('input[value="308"]').prop('checked', false);
        }

        if (dismantling) {
            $('input[value="401"]').prop('checked', true);
            $('input[value="402"]').prop('checked', true);
            $('input[value="403"]').prop('checked', true);
        } else {
            $('input[value="401"]').prop('checked', false);
            $('input[value="402"]').prop('checked', false);
            $('input[value="403"]').prop('checked', false);
        }

        if (interior_construction) {
            $('input[value="501"]').prop('checked', true);
            $('input[value="502"]').prop('checked', true);
            $('input[value="503"]').prop('checked', true);
            $('input[value="504"]').prop('checked', true);
            $('input[value="505"]').prop('checked', true);
            $('input[value="506"]').prop('checked', true);
            $('input[value="507"]').prop('checked', true);
            $('input[value="508"]').prop('checked', true);
            $('input[value="509"]').prop('checked', true);
            $('input[value="510"]').prop('checked', true);
            $('input[value="511"]').prop('checked', true);
        } else {
            $('input[value="501"]').prop('checked', false);
            $('input[value="502"]').prop('checked', false);
            $('input[value="503"]').prop('checked', false);
            $('input[value="504"]').prop('checked', false);
            $('input[value="505"]').prop('checked', false);
            $('input[value="506"]').prop('checked', false);
            $('input[value="507"]').prop('checked', false);
            $('input[value="508"]').prop('checked', false);
            $('input[value="509"]').prop('checked', false);
            $('input[value="510"]').prop('checked', false);
            $('input[value="511"]').prop('checked', false);
        }

        if (equipment_work) {
            $('input[value="601"]').prop('checked', true);
            $('input[value="602"]').prop('checked', true);
            $('input[value="603"]').prop('checked', true);
            $('input[value="604"]').prop('checked', true);
            $('input[value="605"]').prop('checked', true);
        } else {
            $('input[value="601"]').prop('checked', false);
            $('input[value="602"]').prop('checked', false);
            $('input[value="603"]').prop('checked', false);
            $('input[value="604"]').prop('checked', false);
            $('input[value="605"]').prop('checked', false);
        }

        if (other) {
            $('input[value="701"]').prop('checked', true);
            $('input[value="702"]').prop('checked', true);
            $('input[value="703"]').prop('checked', true);
            $('input[value="704"]').prop('checked', true);
            $('input[value="705"]').prop('checked', true);
            $('input[value="706"]').prop('checked', true);
            $('input[value="707"]').prop('checked', true);
            $('input[value="708"]').prop('checked', true);
            $('input[value="709"]').prop('checked', true);
        } else {
            $('input[value="701"]').prop('checked', false);
            $('input[value="702"]').prop('checked', false);
            $('input[value="703"]').prop('checked', false);
            $('input[value="704"]').prop('checked', false);
            $('input[value="705"]').prop('checked', false);
            $('input[value="706"]').prop('checked', false);
            $('input[value="707"]').prop('checked', false);
            $('input[value="708"]').prop('checked', false);
            $('input[value="709"]').prop('checked', false);
        }

        var large_industry_checked = $('input[name="large_industry[]"]:checked').length;
        if (!large_industry_checked) {
            $('#large_industry').text('')
            $('#small_industry').text('')
            $('input[name="industry"]').val('');
            $('input[name="large_industry"]').val('');

        }

        var large_industry = [];
        large_industry.length = 0;
        $('input:checkbox[name="large_industry[]"]:checked').each(function() {
            large_industry.push($(this).parent('label').text());
            $('#large_industry').text(large_industry);
            $('input[name="industry"]').val(large_industry);
            $('input[name="large_industry"]').val(large_industry);

        });

        var small_industry = [];
        small_industry.length = 0;
        $('input:checkbox[name="small_industry[]"]:checked').each(function() {
            small_industry.push($(this).parent('label').text());
            $('#small_industry').text(small_industry);
            $('input[name="s_industry"]').val(small_industry);
            $('input[name="small_industry"]').val(small_industry);

        });
    });

    $('input[name="small_industry[]"]').change(function() {
        var small_industry_checked = $('input[name="small_industry[]"]:checked').length;
        if (!small_industry_checked) {
            $('#small_industry').text('')
            $('input[name="s_industry"]').val('');
            $('input[name="small_industry"]').val('');

        }

        var small_industry = [];
        small_industry.length = 0;
        $('input:checkbox[name="small_industry[]"]:checked').each(function() {
            small_industry.push($(this).parent('label').text());
            $('#small_industry').text(small_industry);
            $('input[name="s_industry"]').val(small_industry);
            $('input[name="small_industry"]').val(small_industry);

        });
    });

    $('.btn-update').click(function() {
        $('.error').remove();
        var contractor_type = $('input[name="contractor_type"]:checked').length;
        var code = $('input[name="code"]').val();
        var company_name = $('input[name="company_name"]').val();
        var company_name_len = $('input[name="company_name"]').val().length;
        var company_name_kana = $('input[name="company_name_kana"]').val();
        var company_name_kana_len = $('input[name="company_name_kana"]').val().length;
        var company_type = $('input[name="company_type"]:checked').length;
        var decision = $('input[name="decision"]:checked').length;
        var large_industry = $('input[name="large_industry[]"]:checked').length;
        var small_industry = $('input[name="small_industry[]"]:checked').length;
        var closing_date = $('input[name="closing_date"]').val();
        var payment_site = $('input[name="payment_site"]').val();
        var payment_site_boolean = Number(payment_site)>999 || Number(payment_site)<0;
        var bank = $('input[name="bank_name"]').val();
        var branch_name_len = $('input[name="branch_name"]').val().length;
        var account_number = $('input[name="account_number"]').val();
        var account_number_len = $('input[name="account_number"]').val().length;
        var account_number_len_boolean = account_number_len==7;
        var nominee_len = $('input[name="nominee"]').val().length;
        var branch_name = $('input[name="branch_name"]').val();
        var account_type = $('select[name="account_type"]').val();
        var nominee = $('input[name="nominee"]').val();
        var rounding = $('input[name="rounding"]').val();
        var remarks = $('textarea[name="remarks"]').val();
        var remarks_len = $('textarea[name="remarks"]').val().length;
        var bank_name_len = $('input[name="bank_name"]').val().length;
        var bank_name =($('input[name="bank_name"]').val().match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\a-zA-Z]+$/)) ? true : false;
        var code_len = $('input[name="code"]').val().length;
        var code = $('input[name="code"]').val();
        var head_office_location = $('input[name="head_office_location"]').val();
        var head_office_location_len = $('input[name="head_office_location"]').val().length;
        var office_location = $('input[name="office_location"]').val();
        var office_location_len = $('input[name="office_location"]').val().length;
        var representative_name = $('input[name="representative_name"]').val();
        var representative_name_len = $('input[name="representative_name"]').val().length;
        var capital = $('input[name="capital"]').val();
        var capital_len = $('input[name="capital"]').val().length;
        var number_of_employees = $('input[name="number_of_employees"]').val();
        var number_of_employees_len = $('input[name="number_of_employees"]').val().length;
        var company_tel = $('input[name="company_tel"]').val();
        var company_tel_len = $('input[name="company_tel"]').val().length;
        var company_fax = $('input[name="company_fax"]').val();
        var company_fax_len = $('input[name="company_fax"]').val().length;
        var rounding = $('input[name="rounding"]').val().length;
        var closing_date = $('select[name="closing_date"]').val();

        if (!code) {
            $('input[name="code"]').parent().append("<div style='color: red;' class='error'>業者を選択してください。</div>");
        }

        if (!contractor_type) {
            $('.contractor_type-radio').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
        }

        if (!company_name) {
            $('input[name="company_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (company_name_len > 100) {
            $('input[name="company_name"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
        } else if (!isNaN(company_name)) {
            $('input[name="company_name"]').parent().append("<div style='color: red;' class='error'>文字で入力してください。</div>");
        }

        if (!company_name_kana) {
            $('input[name="company_name_kana"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        } else if (!company_name_kana.match(/^[\u3041-\u3096|\.|\ー|\・\d]+$/)) {
            $('input[name="company_name_kana"]').parent().append("<div style='color: red;' class='error'>ひらがなで入力してください。</div>");
        } else if (company_name_kana_len > 200) {
            $('input[name="company_name_kana"]').parent().append("<div style='color: red;' class='error'>200文字以内で入力してください。</div>");
        } else if (!isNaN(company_name_kana)) {
            $('input[name="company_name_kana"]').parent().append("<div style='color: red;' class='error'>文字で入力してください。</div>");
        }

        if (!company_type) {
            $('.company_type-radio').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
        }

        if (!decision) {
            $('.decision-radio').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
        }

        if (!large_industry) {
            $('#large_industry').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        if(payment_site_boolean) {
            $('input[name="payment_site"]').parent().append("<div style='color: red;' class='error'>最大桁数3桁まで入力してください。※マイナスの入力は不可です。</div>");
        }

        if (branch_name_len > 20) {
            $('input[name="branch_name"]').parent().append("<div style='color: red;' class='error'>最大桁数20桁で入力してください。</div>");
        }

        if (rounding > 10) {
            $('input[name="rounding"]').parent().append("<div style='color: red;' class='error'>10字以内で入力してください。</div>");
        }

        if (account_number){
            if(!account_number_len_boolean) {
                $('input[name="account_number"]').parent().append("<div style='color: red;' class='error'>7桁の半角数字を入力してください。</div>");
            }
        }

        if (nominee_len) {
            if (nominee_len > 31) {
                $('input[name="nominee"]').parent().append("<div style='color: red;' class='error'>31文字以内で入力してください。</div>");
            }
        }

        if (remarks) {
            if (remarks_len > 100) {
                $('textarea[name="remarks"]').parent().append("<div style='color: red;' class='error'>100文字以内で入力してください。</div>");
            }
        }

        // if (bank_name_len) {
        //     if (bank_name_len > 20) {
        //         $('input[name="bank_name"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
        //     }
        // }

        if (bank_name_len) {
            if (bank_name_len > 20) {
                $('input[name="bank_name"]').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");
            } else if(!bank_name){
                $('input[name="bank_name"]').parent().append("<div style='color: red;' class='error'>全角文字のみ（数字不可）で入力してください。</div>");
            }
        }

        if (code_len) {
            if (code_len > 8 || code_len < 8) {
                $('input[name="code"]').parent().append("<div style='color: red;' class='error'>8桁の半角数字のみで入力してください。</div>");
            } else if(isNaN(code)){
                $('input[name="code"]').parent().append("<div style='color: red;' class='error'>半角数字のみで入力してください。</div>");
            }
        }

        if (head_office_location) {
            if (head_office_location_len > 150) {
                $('input[name="head_office_location"]').parent().append("<div style='color: red;' class='error'>150桁以内で入力してください。</div>");
            }else if(!isNaN(head_office_location)){
                $('input[name="head_office_location"]').parent().append("<div style='color: red;' class='error'>文字で入力してください。</div>");
            }
        }

        if (office_location) {
            if (office_location_len > 150) {
                $('input[name="office_location"]').parent().append("<div style='color: red;' class='error'>150桁以内で入力してください。</div>");
            }else if(!isNaN(office_location)){
                $('input[name="office_location"]').parent().append("<div style='color: red;' class='error'>文字で入力してください。</div>");
            }
        }

        if (number_of_employees_len) {
            if (number_of_employees_len > 10) {
                $('input[name="number_of_employees"]').parent().append("<div style='color: red;' class='error'>10桁以内で入力してください。</div>");
            }
        }

        if (representative_name) {
            if (representative_name_len > 30) {
                $('input[name="representative_name"]').parent().append("<div style='color: red;' class='error'>30文字以内で入力してください。</div>");
            }else if(!isNaN(representative_name)){
                $('input[name="representative_name"]').parent().append("<div style='color: red;' class='error'>文字で入力してください。</div>");
            }
        }

        if (capital) {
            if (capital_len > 11) {
                $('input[name="capital"]').parent().append("<div style='color: red;' class='error'>11桁以内で入力してください。</div>");
            }
        }

        if (company_tel) {
            if (company_tel_len > 13) {
                $('input[name="company_tel"]').parent().append("<div style='color: red;' class='error'>13桁以内で入力してください。</div>");
            } else if (!company_tel.match(/^[\d|\-]+$/)) {
                $('input[name="company_tel"]').parent().append("<div style='color: red;' class='error'>半角数字と記号「-」のみで入力してください。</div>");
            }
        }

        if (company_fax) {
            if (company_fax_len > 13) {
                $('input[name="company_fax"]').parent().append("<div style='color: red;' class='error'>13桁以内で入力してください。</div>");
            } else if (!company_fax.match(/^[\d|\-]+$/)) {
                $('input[name="company_fax"]').parent().append("<div style='color: red;' class='error'>半角数字と記号「-」のみで入力してください。</div>");
            }
        }

        if (!small_industry) {
            $('#small_industry').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        // 異常値で作成されるとほかの画面で影響があるので仮のバリデーション
        if (!closing_date) {
            $('input[name="closing_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        // 異常値で作成されるとほかの画面で影響があるので仮のバリデーション
        if (32 > Number(closing_date) > 0) {
            $('input[name="closing_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }
        
        if (branch_name || account_type!="0" || closing_date!="0" || account_number || nominee || payment_site ||rounding){
            if (!bank){
               $('input[name="bank_name"]').parent().append("<div style='color: red;' class='error'>銀行名を入力してください。</div>"); 
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

    $('select[name="person_in_charge"]').change(function() {
        var url = '/partner_companies/get_usertel';
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        var person_in_charge = $(this).val();

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {name: person_in_charge},
            headers: {'X-CSRFToken': csrftoken},
            timeout: 3000,
        }).done(function(data) {
            $('input[name="person_in_charge_tel"]').val(data.tel);
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {

        });
    });

    $('.btn-back').click(function() {
        var result = window.confirm("このページを離れます。よろしいでしょうか？");
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
});

function popupImage() {
    var popup = document.getElementById('js-popup');
    if (!popup) return;
    var closeBtn = document.getElementById('popup-btn');
    var showBtn = document.getElementById('js-show-popup');

    closePopUp(closeBtn);
    closePopUp(showBtn);

    function closePopUp(elem) {
        if (!elem) return;
        elem.addEventListener('click', function() {
            popup.classList.toggle('is-show');
        });
    }
}
popupImage();