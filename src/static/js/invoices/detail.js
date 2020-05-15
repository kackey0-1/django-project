$(function() {

    /** 消去ボタン押下時の処理 */
    $('._invoice-delete-btn').on('click', function() {
        const result = window.confirm("入力したデータは全て破棄されます。よろしいですか？");
        /** 削除前の確認 */
        if (result != true) {
            return false;
        }
    });

    /** 戻るボタン押下時の処理 */
    $('._go_back_btn').on('click', function(){
        const result = window.confirm("保存していないデータは削除されます。よろしいですか？");
        if (result != true){
            return false;
        }
        window.history.back();
    })

    /** 保存ボタン押下時の処理 */
    $('._invoice-save-button').on('click', function(){
        $('.error').remove();
        if (saveValidate(isPreview)) {
            return false;
        }
    });

    /** プレビューボタン押下時の処理 */
    $('._invoice-preview-btn').on('click', function(){
        const result = window.confirm("入力された情報は保存されます。よろしいでしょうか。");
        if (result != true) {
            return false;
        }
        $('.error').remove();
        if (saveValidate(isPreview)) {
            return false;
        }
    });

    /** 明細削除ボタン押下時の処理 */
    $(document).on("click", '._delete-detail-btn', function(){
        // 明細行削除し、invoice_detail_idを持っている要素には削除フラグ=true
        const deleteRow = $(this).parent().parent()
        deleteRow.addClass('_hidden-row')
        deleteRow.find("[name='delete_flgs[]']").val("true")
        calcTotal()
    })

    /** 行追加ボタン押下時の処理 */
    $('._add-row').on('click', function(){
        const addedRow = $('._add-invoice-detail').clone()
        addedRow.removeClass('_add-invoice-detail').removeClass('_hidden-row')
        addedRow.appendTo('#add-row-target')
    })

    /** 色変更ボタン押下時の処理 */
    $('._invoice-colored-btn').on('click', function(){
        if ($('#colored_flag').val() === '0'){
            $('#colored_flag').val(1)
            $('#_invoice-desctiption').css('color', 'red')
        } else {
            $('#colored_flag').val(0)
            $('#_invoice-desctiption').css('color', 'black')
        }
    })

    /** 金額変更時の処理 */
    $(document).on('change', '._prices', function(){
        calcTotal()
    })

    /** 見積書コード選択時 */
    $(document).on('change', '._estimation-code-pd', function(){
        estimation_code = $(this).val()
        estimation_construction_name = $('#_estimation_construction_name-' + estimation_code).val()
        estimation_total = $('#_estimation_total-' + estimation_code).val()
        $(this).parent().parent().find("[name='project_types[]']").val(estimation_construction_name)
        $(this).parent().parent().find("[name='quantities[]']").val("1")
        $(this).parent().parent().find("[name='prices[]']").val(estimation_total).change()
    })
});

function calcTotal(){
    let total = 0
    let taxRate = Number(document.getElementById('tax_rate').value)
    deleteFlags = document.getElementsByName('delete_flgs[]')
    targets = document.getElementsByName('prices[]')
    for (i=0; i<targets.length; i++){
        if (deleteFlags[i].value !== "true"){
            total += Number(targets[i].value)
        }
    }
    document.getElementById('invoice_total').textContent = StringUtil.addComma(total)
    document.getElementById('invoice_tax').textContent = StringUtil.addComma(Math.floor(total * Number(taxRate)))
    console.log(StringUtil.addComma(Math.floor(total * Number(taxRate))))
    document.getElementById('invoice_total_with_tax').textContent = StringUtil.addComma(total + Math.floor(total * Number(taxRate)))
    document.getElementById('billing_total').value = (total + Math.floor(total * Number(taxRate)))
}

function saveValidate(isPreview){
    const messageBox = document.getElementById('_message-box')
    messageBox.innerHTML = ""
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';     // 一時的にメッセージを入れておく

    /** 請求情報 */
    const clientName = document.getElementsByName('client_name')[0].value
    const contractorName = document.getElementsByName('contractor_name')[0].value
    const paymentDate = document.getElementsByName('payment_date')[0].value
    const bankAccount = document.getElementsByName('bank_account')[0].value
    const publishedDate = document.getElementsByName('published_date')[0].value
    const comfirmDate = document.getElementsByName('comfirm_date')[0].value
    const billingTotal = document.getElementsByName('billing_total')[0].value
    const contractTotal = document.getElementsByName('contract_total')[0].value
    const balanceTotal = document.getElementsByName('balance_total')[0].value
    const constructionName = document.getElementsByName('construction_name')[0].value
    const billingUserName = document.getElementsByName('billing_user_name')[0].value
    const salesUserName = document.getElementsByName('sales_user_name')[0].value
    const description = document.getElementsByName('description')[0].value
    // checkboxのバリデーション
    const billingTypes = document.getElementsByName('billing_type')
    const deliveryMethods = document.getElementsByName('delivery_method')
    /** 請求明細情報 */
    const deleteFlgs = document.getElementsByName('delete_flgs[]')
    const projectTypes = document.getElementsByName('project_types[]')
    const quantities = document.getElementsByName('quantities[]')
    const prices = document.getElementsByName('prices[]')

    
    if (clientName === ""
        || contractorName === ""
        || clientName === ""
        || constructionName === ""
        || billingUserName === ""
        || salesUserName === ""
        || bankAccount === ""
        || !validateCheckbox(deliveryMethods)
        || !validateCheckbox(billingTypes)){
            t_msg = '<p>入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
    }

    if(clientName===""){
        $('input[name="client_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(contractorName===""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(constructionName===""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(bankAccount===""){
        $('input[name="bank_account"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(billingUserName===""){
        $('select[name="billing_user_name"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
    }
    if(salesUserName===""){
        $('select[name="sales_user_name"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
    }
    if(!validateCheckbox(deliveryMethods)){
        $('input[name="delivery_method"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
    }
    if(!validateCheckbox(billingTypes)){
        $('input[name="billing_type"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
    }

    // 文字数チェック:請求先顧客名
    const maxlen_clientName = 100;
    if (Validation.isOverLen(clientName, maxlen_clientName)){
        // t_msg = '請求先顧客名:' + maxlen_constructionName + '文字以下で入力してください。';
        t_msg = '<p>請求先顧客名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:契約者名
    const maxlen_contractorName = 20;
    if (Validation.isOverLen(contractorName, maxlen_contractorName)){
        t_msg = '<p>契約者名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:振込先
    const maxlen_bankAccount = 100;
    if (Validation.isOverLen(bankAccount, maxlen_bankAccount)){
        t_msg = '<p>振込先：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 日付チェック:請求書発行日
    if (Validation.isValidDate(publishedDate)){
        t_msg = '<p>請求書発行日：入力した日付が保存可能な値でないため、保存できません。再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:今回請求金額
    const maxlen_billingTotal = 11;
    if (Validation.isOverLen(billingTotal, maxlen_billingTotal)){
        t_msg = '<p>今回請求金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:御契約金額
    const maxlen_contractTotal = 11;
    if (Validation.isOverLen(contractTotal, maxlen_contractTotal)){
        t_msg = '<p>御契約金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:残金
    const maxlen_balanceTotal = 11;
    if (Validation.isOverLen(balanceTotal, maxlen_balanceTotal)){
        t_msg = '<p>残金：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:備考
    const maxlen_description = 100;
    if (Validation.isOverLen(description, maxlen_description)){
        t_msg = '<p>備考：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 日付チェック:入金確認日
    if (Validation.isValidDate(comfirmDate)){
        t_msg = '<p>入金確認日：入力した日付が保存可能な値でないため、保存できません。再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLen(constructionName, maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* 明細チェック */
    for (let i = 0; i<deleteFlgs.length; i++){
        if (deleteFlgs[i].value === "true"){
            continue;
        }
        /** 文字数チェック:名称 */
        const maxlen_projectTypes = 50;
        if(Validation.isOverLen(projectTypes[i].value, maxlen_projectTypes)){
            t_msg = '<p>[内訳]現場名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大値チェック:数量 */
        const maxlen_quantities = 11;
        if(Validation.isOverLen(quantities[i].value, maxlen_quantities)){
            t_msg = '<p>[内訳]数量：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大桁数チェック:単位 */
        const maxlen_prices = 11;
        if(Validation.isOverLen(prices[i].value, maxlen_prices)){
            t_msg = '<p>[内訳]単位：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        if(i != (deleteFlgs.length-1)){
            /** 空白チェック:名称 */
            if(Validation.isBlank(projectTypes[i].value)){
                t_msg = '<p>[内訳]現場名：入力が完了していません。</p>'
                errorMessage += t_msg;
                errorFlag = true;
            }
            /** 空白チェック:数量 */
            if(Validation.isBlank(quantities[i].value)){
                t_msg = '<p>[内訳]数量：入力が完了していません。</p>'
                errorMessage += t_msg;
                errorFlag = true;
            }
            /** 空白チェック:金額 */
            if(Validation.isBlank(prices[i].value)){
                t_msg = '<p>[内訳]金額：入力が完了していません。</p>'
                errorMessage += t_msg;
                errorFlag = true;
            }
        }
    }
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
    }
    return errorFlag
}

function validateCheckbox(elements) {
    nullFlag = false;
    for(i=0; i<elements.length; i++){
        if(elements[i].checked){
            nullFlag = true
        }
    }
    return nullFlag
}
