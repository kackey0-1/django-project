console.log("%cload outsource-orders search.js", "color: blue;");

$(function() {
    /*
    * 消去ボタン押下時の処理
    */
    $('._delete-outsource-order').click(function(event) {
        /** 削除前の確認 */
        const result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
        /** 削除リクエスト */
        const outsource_order_id = $(this).val();
        const url = location.origin + "/outsource-orders/deletejs/" + outsource_order_id
        $.get(url).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            $('._row' + outsource_order_id).remove()
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.message)
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass(data.responseJSON.alert_type)
            $('#_message-box').text(data.responseJSON.alert_message)
        });
    });

    /*
    * 選択消去ボタン押下時の処理
    */
    $('._delete-choice-outsource-order').click(function() {
        // 選択された請求書IDを取得
        const outsource_ids = $('[name="outsource-order-id"]:checked').map(function(){
            return $(this).val();
        }).get();
        if(outsource_ids.length === 0){
            $('#_message-box').addClass('alert-danger')
            $('#_message-box').text("対象データが選択されていません。")
            return false;
        }

        // 削除前の確認
        const result = window.confirm("削除します。よろしいでしょうか？");
        if (result === false) {
            return false;
        }
        // Request URL
        const url = location.origin + '/outsource-orders/choice_delete'
        console.log(outsource_ids)
        const params = {
            'outsource_order_ids[]': outsource_ids,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        }
        // 選択削除リクエスト
        $.post(url, params).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            outsource_ids.forEach((outsource_id) => {
                $('._row' + outsource_id).remove()
            });
            console.log("a");
            $('#_message-box').addClass(data.alert_type);
            $('#_message-box').text("削除しました。");
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            console.log("b");
            $('#_message-box').addClass(data.responseJSON.alert_type);
            $('#_message-box').text(data.responseJSON.alert_message);
        });
    });

    // 検索が行われたとき（フォームがコミットされたとき）
    $('._search-form').submit(()=>{
        if(hasErrorForSearching()){ // 検索条件バリデーション
            console.log('search: error')
            return false;
        }else{
            console.log('search: ok')
            return true;
        }
    })
});

// 検索条件バリデーション
function hasErrorForSearching(){
    console.log('validation')
    // 各フォームの値をセット
    const constructionName = document.getElementsByName('construction_name')[0].value
    console.log(constructionName)
    const partnerCompanyName = document.getElementsByName('partner_company_name')[0].value
    console.log(partnerCompanyName)
    const constructionCode = document.getElementsByName('construction_code')[0].value
    console.log(constructionCode)
    const clientName = document.getElementsByName('client_name')[0].value
    console.log(clientName)

    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';     // 一時的にメッセージを入れておく

    /** 入力チェック */
    // return true
    if ($('#status').val() === "" &&
        $('#construction_name').val() === "" &&
        $('#sales1_user_id').val() === "" &&
        $('#site1_user_id').val() === "" &&
        $('#partner_company_name').val() === "" &&
        $('#construction_code').val() === "" &&
        $('#client_name').val() === "" &&
        $('#end_date').val() === "" &&
        $('#order_end_date').val() === "" &&
        $('#order_date').val() === ""){

        location.href = "/";
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (String(constructionName).length > maxlen_constructionName){
        // t_msg = '工事件名：' + maxlen_constructionName + '文字以下で入力してください。';
        t_msg = '<p>工事件名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注先業者名
    const maxlen_partnerCompanyName = 100;
    if (String(partnerCompanyName).length > maxlen_partnerCompanyName){
        // t_msg = '発注先業者名：' + maxlen_partnerCompanyName + '文字以下で入力してください。';
        t_msg = '<p>発注先業者名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    if(constructionCode != "" ){
        if( !constructionCode.match(/^\d+$/)){
            t_msg = '<p>工事番号には半角数字のみが入力可能です。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
    }
    // 文字数チェック：工事番号
    const maxlen_constructionCode = 8;
    if (String(constructionCode).length > maxlen_constructionCode){
        // t_msg = '発注先業者名：' + maxlen_partnerCompanyName + '文字以下で入力してください。';
        t_msg = '<p>工事番号：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：顧客名
    const maxlen_clientName = 30;
    if (String(clientName).length > maxlen_clientName){
        // t_msg = '発注先業者名：' + maxlen_partnerCompanyName + '文字以下で入力してください。';
        t_msg = '<p>顧客名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。　文字数を減らして検索してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
    }else{
    }
    return errorFlag;
}
