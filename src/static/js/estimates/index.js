$(function() {
    /** 検索ボタン押下時の処理 */
    $('._estimation-search-btn').on('click', function(){
        const messageBox = document.getElementById('_message-box')
        messageBox.innerHTML = ""
        let errorFlag = false;
        let errorMessage = '';  // 最終的にHTML上に表示するテキスト
        let t_msg = '';     // 一時的にメッセージを入れておく
        /** 入力チェック */
        if ($('#status').val() === "" &&
            $('#construction_name').val() === "" &&
            $('#sales_user_name').val() === "" &&
            $('#accountant_user_name').val() === "" &&
            $('#submission_date').val() === "" &&
            $('#estimation_code').val() === "" &&
            $('#construction_code').val() === "" &&
            $('#client_name').val() === "" &&
            $('#contractor_name').val() === ""){
            
            // 全件検索に戻る
            location.href = "/estimates/search";
        }
        /** 文字数チェック:工事件名 */
        const maxlen_constructionName = 50;
        if(Validation.isOverLen($('#construction_name').val(), maxlen_constructionName)){
            t_msg = '<p>工事件名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:見積書番号 */
        const maxlen_estimationCode = 20;
        if(Validation.isOverLen($('#estimation_code').val(), maxlen_estimationCode)){
            t_msg = '<p>見積書番号：検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:工事番号 */
        const maxlen_constructionCode = 8;
        if(Validation.isOverLen($('#construction_code').val(), maxlen_constructionCode)){
            t_msg = '<p>工事番号：検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 工事番号は半角数字のみ入力可 */
        if($('#construction_code').val() != "" ){
            if( !$('#construction_code').val().match(/^\d+$/)){
                t_msg = '<p>工事番号には半角数字のみが入力可能です。</p>'
                errorMessage += t_msg;
                errorFlag = true;
            }
        }
        /** 文字数チェック:顧客名 */
        const maxlen_clientName = 20;
        if(Validation.isOverLen($('#client_name').val(), maxlen_clientName)){
            t_msg = '<p>顧客名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:契約者名 */
        const maxlen_contractorName = 20;
        if(Validation.isOverLen($('#contractor_name').val(), maxlen_contractorName)){
            t_msg = '<p>契約者名：検索条件の文字列が規定の文字数を上回っているため、検索ができません。文字数を減らして検索してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        if(errorFlag){
            messageBox.innerHTML = errorMessage;
            messageBox.classList.add('alert-danger');
            return false;
        }
    })

    /** コピー時のバリデーション追加 */
    $('._estimate-copy-btn').on('click', function(){
      const construction_code = window.prompt("コピー先の工事番号を入力してください。")
      if (construction_code === null || construction_code === ""){

          return false;
          
      }
      if ( construction_code.match(/^(\d{8})+$/)){
          $('#_construction_code').val(construction_code);
      }else{
          let errorMessage = '半角数字8桁を入力してください。'; 
          document.getElementById('_message-box').innerHTML = errorMessage;
          document.getElementById('_message-box').classList.add('alert-danger');
          return false;
      }

    })
    
    /** 消去ボタン押下時の処理 */
    $('._estimate-delete-btn').on('click', function() {
        const result = window.confirm("本当に削除しますか？");
        /** 削除前の確認 */
        if (result != true) {
            return false;
        }
        /** 削除処理要求 */
        const estimation_id = $(this).val()
        const url = location.origin + "/estimates/deletejs/" + estimation_id
        /** 削除リクエスト */
        $.get(url).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            $('._row'+estimation_id).remove()
            $('#_message-box').addClass(data.alert_type)
            $('#_message-box').text(data.alert_message)
        }).fail(function(data, textStatus, errorThrown){
            // エラーの場合処理
            $('#_message-box').addClass(data.responseJSON.alert_type)
            $('#_message-box').text(data.responseJSON.alert_message)
        });
    });

    

    /** 選択消去ボタン押下時の処理 */
    $('#_estimates-delete-btn').on('click', function() {
        /** 選択された請求書IDを取得 */
        const estimations_id = $('[name="estimation_id"]:checked').map(function(){
            return $(this).val();
        }).get();
        if(!estimations_id.length > 0){
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
        const url = location.origin + '/estimates/choice_delete'
        const params = {
            'estimations_id[]': estimations_id,
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        }
        /** 選択削除リクエスト */
        $.post(url, params).done(function(data, textStatus, jqXHR){
            // 成功の場合の処理
            estimations_id.forEach((estimation_id, i) => {
                $('._row'+estimation_id).remove()
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
