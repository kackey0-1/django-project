
/*
    秘密契約保持、工事保証書、工事保障確認書
*/
function hasValidationErrorDefault(){
    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';

    if(Validation.isBlankAnyInputs(
        'contract_date',
        'construction_name',
        'contractor_name',
        'contractor_address',
        'published_date'
    )){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('construction_name')[0].value === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_address')[0].value === ""){
        $('input[name="contractor_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('published_date')[0].value === ""){
        $('input[name="published_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者氏名
    const maxlen_constractorName = 30;
    if (Validation.isOverLenInput('contractor_name', maxlen_constractorName)){
        t_msg = '<p>発注者氏名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者住所
    const maxlen_constractorAddress = 150;
    if (Validation.isOverLenInput('contractor_address', maxlen_constractorAddress)){
        t_msg = '<p>発注者住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // エラーメッセージ表示
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}

/*
    工事請負契約書
*/
function hasValidationErrorForContract(){
    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト

    if(Validation.isBlankAnyInputs(
        'contract_date',
        'construction_name',
        'contractor_name',
        'contractor_address',
        'published_date',

        'contract_site_address',
        'contract_description',
        'contract_start_date',
        'contract_end_date',
        'contract_total_with_tax',
        'contract_tax',
        'contract_payment_concluded',
        'contract_payment_completed',
        'contract_acceptance_day'
    )){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    // 管理者入力可能の場合、必須項目とする
    if($('input[name="contract_paper_type"]:checked').val() == "0"){
        if(Validation.isBlankInput('contract_paper_type_admin_name')){
            errorMessage = '<p>入力が完了していません。</p>';
            errorFlag = true;
            $('input[name="contract_paper_type_admin_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }
    }
    if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('construction_name')[0].value === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_address')[0].value === ""){
        $('input[name="contractor_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('published_date')[0].value === ""){
        $('input[name="published_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    if(document.getElementsByName('contract_site_address')[0].value === ""){
        $('input[name="contract_site_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_description')[0].value === ""){
        $('input[name="contract_description"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_start_date')[0].value === ""){
        $('input[name="contract_start_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_end_date')[0].value === ""){
        $('input[name="contract_end_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_total_with_tax')[0].value === ""){
        $('input[name="contract_total_with_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_tax')[0].value === ""){
        $('input[name="contract_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_payment_concluded')[0].value === ""){
        $('input[name="contract_payment_concluded"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_payment_completed')[0].value === ""){
        $('input[name="contract_payment_completed"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contract_acceptance_day')[0].value === ""){
        $('input[name="contract_acceptance_day"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者氏名
    const maxlen_constractorName = 30;
    if (Validation.isOverLenInput('contractor_name', maxlen_constractorName)){
        t_msg = '<p>発注者氏名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者住所
    const maxlen_constractorAddress = 150;
    if (Validation.isOverLenInput('contractor_address', maxlen_constractorAddress)){
        t_msg = '<p>発注者住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* ここからtemplate内 */

    // 文字数チェック：工事場所
    const maxlen_contractSiteAddress = 150;
    if (Validation.isOverLenInput('contract_site_address', maxlen_contractSiteAddress)){
        t_msg = '<p>工事場所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事内容
    const maxlen_contractDescription = 100;
    if (Validation.isOverLenInput('contract_description', maxlen_contractDescription)){
        t_msg = '<p>工事内容：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：請負代金額
    const maxlen_contractTotalWothTax = 11;
    if (Validation.isOverLenInput('contract_total_with_tax', maxlen_contractTotalWothTax)){
        t_msg = '<p>請負代金額 工事金額(受注金額)税込み：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：消費税
    const maxlen_contractTax = 11;
    if (Validation.isOverLenInput('contract_tax', maxlen_contractTax)){
        t_msg = '<p>請負代金額 消費税：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：支払方法 契約成立時
    const maxlen_contractPaymentConcluded = 100;
    if (Validation.isOverLenInput('contract_payment_concluded', maxlen_contractPaymentConcluded)){
        t_msg = '<p>支払方法 契約成立時：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：支払方法 完成引渡し時
    const maxlen_contractPaymentCompleted = 100;
    if (Validation.isOverLenInput('contract_payment_completed', maxlen_contractPaymentCompleted)){
        t_msg = '<p>支払方法 完成引渡し時：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：検査及び引き渡し時期
    const maxlen_contractAcceptanceDay = 2;
    if (Validation.isOverLenInput('contract_acceptance_day', maxlen_contractAcceptanceDay)){
        t_msg = '<p>検査及び引き渡し時期：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    if($('input[name="contract_paper_type_admin_name"]').prop('disabled') == false){
        // 文字数チェック：書類タイプ 監理者
        const maxlen_contractPaperTypeAdminName = 30;
        if (Validation.isOverLenInput('contract_paper_type_admin_name', maxlen_contractPaperTypeAdminName)){
            t_msg = '<p>書類タイプ 監理者：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
            errorMessage += t_msg;
            errorFlag = true;
        }
    }
    // エラーメッセージ表示
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}

/*
    工事請負基本契約書
*/
function hasValidatioinErrorForBasic(){
    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト

    if(Validation.isBlankAnyInputs(
        'contract_date',
        'construction_name',
        'contractor_name',
        'contractor_address',
        'published_date',

        'basic_start_date',
        'basic_end_date',
        'basic_acceptance_day'
    )){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('construction_name')[0].value === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_address')[0].value === ""){
        $('input[name="contractor_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('published_date')[0].value === ""){
        $('input[name="published_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    
    if(document.getElementsByName('basic_start_date')[0].value === ""){
        $('input[name="basic_start_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('basic_end_date')[0].value === ""){
        $('input[name="basic_end_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('basic_acceptance_day')[0].value === ""){
        $('input[name="basic_acceptance_day"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者氏名
    const maxlen_constractorName = 30;
    if (Validation.isOverLenInput('contractor_name', maxlen_constractorName)){
        t_msg = '<p>発注者氏名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者住所
    const maxlen_constractorAddress = 150;
    if (Validation.isOverLenInput('contractor_address', maxlen_constractorAddress)){
        t_msg = '<p>発注者住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* ここからtemplate内 */

    // 文字数チェック：検査及び引き渡し時期
    const maxlen_basicAcceptanceDay = 2;
    if (Validation.isOverLenInput('basic_acceptance_day', maxlen_basicAcceptanceDay)){
        t_msg = '<p>検査及び引き渡し時期：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }


    // エラーメッセージ表示
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}

/*
    工事注文書（基本契約用/約款付）
*/
function hasValidatioinErrorForOrder(){
    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト

    if(Validation.isBlankAnyInputs(
        'contract_date',
        'construction_name',
        'contractor_name',
        'contractor_address',
        'published_date',

        'order_total',
        'order_total_with_tax',
        'order_tax',
        // 'order_description',
        'order_tel',
        // 'order_fax',
        // 'order_date',
        'order_site_address',
        'order_start_date',
        'order_end_date',
        'order_payment_terms'
        // 'order_payment_expected_date_1',
        // 'order_payment_expected_date_2'
    )){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('construction_name')[0].value === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_address')[0].value === ""){
        $('input[name="contractor_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('published_date')[0].value === ""){
        $('input[name="published_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    if(document.getElementsByName('order_total')[0].value === ""){
        $('input[name="order_total"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_total_with_tax')[0].value === ""){
        $('input[name="order_total_with_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_tax')[0].value === ""){
        $('input[name="order_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_tel')[0].value === ""){
        $('input[name="order_tel"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_site_address')[0].value === ""){
        $('input[name="order_site_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_start_date')[0].value === ""){
        $('input[name="order_start_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_end_date')[0].value === ""){
        $('input[name="order_end_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('order_payment_terms')[0].value === ""){
        $('input[name="order_payment_terms"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者氏名
    const maxlen_constractorName = 30;
    if (Validation.isOverLenInput('contractor_name', maxlen_constractorName)){
        t_msg = '<p>発注者氏名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者住所
    const maxlen_constractorAddress = 150;
    if (Validation.isOverLenInput('contractor_address', maxlen_constractorAddress)){
        t_msg = '<p>発注者住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* ここからtemplate内 */

    // 文字数チェック：本体工事金額
    const maxlen_orderTotal = 11;
    if (Validation.isOverLenInput('order_total', maxlen_orderTotal)){
        t_msg = '<p>本体工事金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：税込合計金額
    const maxlen_orderTotalWithTax = 11;
    if (Validation.isOverLenInput('order_total_with_tax', maxlen_orderTotalWithTax)){
        t_msg = '<p>税込み合計金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：係る消費税
    const maxlen_orderTax = 11;
    if (Validation.isOverLenInput('order_tax', maxlen_orderTax)){
        t_msg = '<p>係る消費税：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事内容
    const maxlen_orderDescription = 100;
    if (Validation.isOverLenInput('order_description', maxlen_orderDescription)){
        t_msg = '<p>工事内容：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：TEL
    const maxlen_orderTel = 11;
    if (Validation.isOverLenInput('order_tel', maxlen_orderTel)){
        t_msg = '<p>TEL(連絡先TEL)：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：FAX
    const maxlen_orderFax = 11;
    if (Validation.isOverLenInput('order_fax', maxlen_orderFax)){
        t_msg = '<p>FAX：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：現場住所
    const maxlen_orderSiteAddress = 150;
    if (Validation.isOverLenInput('order_site_address', maxlen_orderSiteAddress)){
        t_msg = '<p>現場住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：お支払い条件
    const maxlen_orderPaymentTerms = 100;
    if (Validation.isOverLenInput('order_payment_terms', maxlen_orderPaymentTerms)){
        t_msg = '<p>お支払い条件：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // エラーメッセージ表示
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}

/*
    工事請負書（基本契約用/約款付）
*/
function hasValidatioinErrorForConfirm(){
    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト

    if(Validation.isBlankAnyInputs(
        'contract_date',
        'construction_name',
        'contractor_name',
        'contractor_address',
        'published_date',

        'confirm_total',
        'confirm_total_with_tax',
        'confirm_tax',
        // 'confirm_description',
        // 'confirm_date',
        'confirm_site_address',
        'confirm_start_date',
        'confirm_end_date',
        'confirm_payment_terms'
        // 'confirm_payment_expected_date_1',
        // 'confirm_payment_expected_date_2'
    )){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if(document.getElementsByName('contract_date')[0].value === ""){
        $('input[name="contract_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('construction_name')[0].value === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_name')[0].value === ""){
        $('input[name="contractor_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('contractor_address')[0].value === ""){
        $('input[name="contractor_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('published_date')[0].value === ""){
        $('input[name="published_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    if(document.getElementsByName('confirm_total')[0].value === ""){
        $('input[name="confirm_total"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_total_with_tax')[0].value === ""){
        $('input[name="confirm_total_with_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_tax')[0].value === ""){
        $('input[name="confirm_tax"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_site_address')[0].value === ""){
        $('input[name="confirm_site_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_start_date')[0].value === ""){
        $('input[name="confirm_start_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_end_date')[0].value === ""){
        $('input[name="confirm_end_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(document.getElementsByName('confirm_payment_terms')[0].value === ""){
        $('input[name="confirm_payment_terms"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (Validation.isOverLenInput('construction_name', maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者氏名
    const maxlen_constractorName = 30;
    if (Validation.isOverLenInput('contractor_name', maxlen_constractorName)){
        t_msg = '<p>発注者氏名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：発注者住所
    const maxlen_constractorAddress = 150;
    if (Validation.isOverLenInput('contractor_address', maxlen_constractorAddress)){
        t_msg = '<p>発注者住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* ここからtemplate内 */

    // 文字数チェック：本体工事金額
    const maxlen_confirmTotal = 11;
    if (Validation.isOverLenInput('confirm_total', maxlen_confirmTotal)){
        t_msg = '<p>本体工事金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：税込み合計金額
    const maxlen_confirmTotalWithTax = 11;
    if (Validation.isOverLenInput('confirm_total_with_tax', maxlen_confirmTotalWithTax)){
        t_msg = '<p>税込み合計金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：係る消費税
    const maxlen_confirmTax = 11;
    if (Validation.isOverLenInput('confirm_tax', maxlen_confirmTax)){
        t_msg = '<p>係る消費税：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事内容
    const maxlen_confirmDescription = 100;
    if (Validation.isOverLenInput('confirm_description', maxlen_confirmDescription)){
        t_msg = '<p>工事内容：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：現場住所
    const maxlen_confirmSiteAddress = 150;
    if (Validation.isOverLenInput('confirm_site_address', maxlen_confirmSiteAddress)){
        t_msg = '<p>現場住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：お支払い条件
    const maxlen_confirmPaymentTerms = 100;
    if (Validation.isOverLenInput('confirm_payment_terms', maxlen_confirmPaymentTerms)){
        t_msg = '<p>お支払い条件：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }


    // エラーメッセージ表示
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}
