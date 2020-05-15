console.log("%cload merchandise-orders index.js", "color: blue;");

$(function() {
    /*
    * 消去ボタン押下時の処理
    */
    $('._delete-merchandise-order').click(function() {
        /** 削除前の確認 */
        const result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
        /** 削除リクエスト */
        const merchandise_order_id = $(this).val();
        const url = location.origin + "/merchandise-orders/deletejs/" + merchandise_order_id
        $.get(url).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            $('._row' + merchandise_order_id).remove()
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.message)
        }).fail(function(jqXHR, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text(errorThrown)
        });
    });

    /*
    * 選択消去ボタン押下時の処理
    */
    $('._delete-choice-merchandise-order').click(function() {
        // 選択された請求書IDを取得
        const merchandise_ids = $('[name="merchandise-order-id"]:checked').map(function(){
            return $(this).val();
        }).get();
        if(merchandise_ids.length === 0){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text("対象データが選択されていません。")
            return false;
        }

        // 削除前の確認
        const result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
        // Request URL
        const url = location.origin + '/merchandise-orders/choice_delete'
        console.log(merchandise_ids)
        const params = {
            'merchandise_order_ids[]': merchandise_ids,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        }
        // 選択削除リクエスト
        $.post(url, params).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            merchandise_ids.forEach((merchandise_id) => {
                $('._row' + merchandise_id).remove()
            });
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.alert_message)
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass(data.responseJSON.alert_type)
            $('#_message-box').text(data.responseJSON.alert_message)
        });
    });

    $('._search-form').submit(function(){
        console.log('submit');
        if(hasErrorForSearching()){
            console.log('ng');
            return false;
        }
        console.log('ok');
    })

    $('._construction_name_pulldown').on('change', (e)=>{
        console.log(e);
        let code = e.target.selectedOptions[0].attributes._construction_code.value
        console.log(code)
        $('._construction-code-text').val(e.target.selectedOptions[0].attributes._construction_code.value)
    })
});

function hasErrorForSearching(){
    console.log('validation')

    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';     // 一時的にメッセージを入れておく

    /** 入力チェック */
    if ($('#status').val() === "" &&
        $('#construction_id').val() === "" &&
        $('#charge_user_name').val() === "" &&
        $('#product_name').val() === "" &&
        $('#product_spec').val() === "" &&
        $('#construction_code').val() === "" &&
        $('#client_name').val() === "" &&
        $('#delivery_date').val() === "" &&
        $('#client_name').val() === "" &&
        $('#order_date').val() === ""){

        t_msg = '検索内容が入力されていません。'
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 30;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        // t_msg = '工事件名：' + maxlen_constructionName + '文字以下で入力してください。';
        t_msg = '<p>工事件名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：品名
    const maxlen_productName = 20;
    if (Validation.isOverLenInput('product_name', maxlen_productName)){
        t_msg = '<p>品名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：仕様
    const maxlen_productSpec = 20;
    if (Validation.isOverLenInput('product_spec', maxlen_productSpec)){
        t_msg = '<p>仕様：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事番号
    const maxlen_constructionCode = 8;
    if (Validation.isOverLenInput('construction_code', maxlen_constructionCode)){
        t_msg = '<p>工事番号：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：顧客名
    const maxlen_clientName = 20;
    if (Validation.isOverLenInput('client_name', maxlen_clientName)){
        t_msg = '<p>顧客名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    const messageBox = $('#_message-box')[0]
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
    }else{
    }
    return errorFlag;
}
