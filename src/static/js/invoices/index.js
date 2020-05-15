$(function() {
    /** 検索ボタン押下時の処理 */
    $('._invoice_search_btn').on('click', function(){
        /** 入力チェック */
        if ($('#construction_name').val() === "" &&
            $('#client_name').val() === "" &&
            $('#published_date').val() === "" &&
            $('#comfirm_date').val() === "" &&
            $('#construction_code').val() === "" &&
            $('#total_with_tax').val() === "" &&
            $('#payment_date').val() === "" &&
            $('#delivery_method').val() === ""){
            
            // 全件検索
            location.href = '/invoices/search';
            return false;
        }
        // return false;
        /** 文字数チェック：工事件名 */
        if (checkLength($('#construction_name').val(), 100)){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text('検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。1')
            return false;
        }
        /** 文字数チェック：請求先名 */
        if (checkLength($('#client_name').val(), 100)){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text('検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。2')
            return false;
        }
        /** 桁数チェック：工事番号 */
        if (checkDegits($('#construction_code').val(), 99999999999999999999)){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text('検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。3')
            return false;
        }
        /** 桁数チェック：金額 */
        if (checkDegits($('#total_with_tax').val(), 999999999999999999999999999999)){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text('検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。4')
            return false;
        }
    })

    /** 消去ボタン押下時の処理 */
    $('._invoice-delete-btn').on('click', function() {
        const result = window.confirm("本当に削除しますか？");
        /** 削除前の確認 */
        if (result != true) {
            return false;
        }
        /** 削除処理要求 */
        const invoice_id = $(this).val()
        const url = location.origin + "/invoices/deletejs/" + invoice_id
        /** 削除リクエスト */
        $.get(url).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            $('._row'+invoice_id).remove()
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.alert_message)
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass(data.responseJSON.alert_type)
            $('#_message-box').text(data.responseJSON.alert_message)
        });
    });

    /** 選択消去ボタン押下時の処理 */
    $('#_invoices-delete-btn').on('click', function() {
        /** 選択された請求書IDを取得 */
        const invoices_id = $('[name="invoice_id"]:checked').map(function(){
            return $(this).val();
        }).get();
        if(!invoices_id.length > 0){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text("削除項目が選択されていません。")
            return false;
        }

        const result = window.confirm("本当に削除しますか？");
        /** 削除前の確認 */
        if (result != true) {
            return false;
        }
        /** Request URL */
        const url = location.origin + '/invoices/choice_delete'
        const params = {
            'invoices_id[]': invoices_id,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        }
        /** 選択削除リクエスト */
        $.post(url, params).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            invoices_id.forEach((invoice_id, i) => {
                $('._row'+invoice_id).remove()
            });
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.alert_message)
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass(data.responseJSON.alert_type)
            $('#_message-box').text(data.responseJSON.alert_message)
        });
    });
});

function checkLength(target, length) {
    if (target.length > length){
        return true;
    }
    return false;
}

function checkDegits(target, max) {
    if (target > max){
        return true;
    }
    return false
}
