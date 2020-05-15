function changeColor(arg) {
    let oldValue = $('input[name="colored_flag"]').val();
    if(oldValue === 1 || oldValue === '1'){
        document.getElementById(arg.value).style.color = "black";
        $('input[name="colored_flag"]').val(0)
    }else{
        document.getElementById(arg.value).style.color = "red";
        $('input[name="colored_flag"]').val(1)
    }
}

// 初期処理
$(function(){
    // 備考の色
    let noteColorFlag = $('input[name="colored_flag"]').val();
    if(noteColorFlag === 1 || noteColorFlag === '1'){
        $('#_note')[0].style.color = "red";
    }else{
        $('#_note')[0].style.color = "black";
    }
});

$(function() {
    /** 消去ボタン押下時の処理 */
    $('._delete-outsource-order-btn').on('click', function() {
        const result = window.confirm("本当に削除しますか？");
        // 削除前の確認
        if (result != true) {
            return false;
        }
    });

    /** 行追加ボタン押下時の処理 */
    $('._add-row-btn').on('click', function(){
        console.log('add row');
        const additionalRow = $('._additional-row');
        const additionalRowStock = additionalRow.clone();
        additionalRow.removeClass('_additional-row');
        additionalRow.toggle();
        console.log(additionalRow.children()[0].value=false)
        additionalRowStock.appendTo('#_add-row-target')
    })

    /** 明細削除ボタン押下時の処理 */
    $(document).on("click", '._delete-detail-btn', function(){
        // 明細行削除し、invoice_detail_idを持っている要素には削除フラグ=true
        const deleteRow = $(this).parent().parent()
        console.log(deleteRow)
        deleteRow.find("[name='delete_flgs[]']").val("true")
        deleteRow.toggle()
        calcTotalFromPrice()
    })

    /** 戻るボタン押下時の処理 */
    $('._go-back-btn').on('click', function(){
        const result = window.confirm("保存していないデータは削除されます。よろしいですか？");
        if (result != true){
            return false;
        }
        window.history.back();
    })

    /** 保存ボタン押下時の処理 */
    $('._save-btn').on('click', function(){
        $('.error').remove();
        if (saveValidate()) {
            return false;
        }
    });

    /** プレビューボタン押下時の処理 */
    $('._preview-btn').on('click', function(){
        $('.error').remove();
        const result = window.confirm("入力された情報は保存されます。よろしいでしょうか。");
        if (result === false) {
            return false;
        }
        if (saveValidate()) {
            return false;
        }
    });

    let searchCompanyModal = new SearchPartnerCompanyModal('search-partner-company-modal');
    $('.js-modal-close').on('click', ()=>{
        searchCompanyModal.modalClose();
    })
    $('._search-partner-company-btn').on('click', ()=>{
        searchCompanyModal.showModal((company)=>{
            if(company){
                console.log(company.fields.company_name)
                $('._partner-company-text').text(company.fields.company_name)
                $('._partner_company_name').val(company.fields.company_name)
                $('._partner_company_id').val(company.id)
            }
        })
    })

    $('[name=charge_user_name]').on('change', (e)=>{
        console.log(e.target.selectedOptions[0].attributes)
        let tel = e.target.selectedOptions[0].attributes._usertel.value
        console.log(tel)
        $('._tel-text').text(tel)
        $('[name=charge_user_tel]').val(tel)
    })
});

/**
入力が異常ならtrueを返す
*/
function saveValidate(){
    console.log(' validation')
    // 各フォームの値をセット
    const partnerCompanyName = document.getElementsByName('partner_company_name')[0].value
    const constructionName = document.getElementsByName('construction_name')[0].value
    const siteAddress = document.getElementsByName('site_address')[0].value
    // const deliverySite = document.getElementsByName('delivery_site')[0].value
    const startDate = document.getElementsByName('construction_start_date')[0].value
    const endDate = document.getElementsByName('construction_end_date')[0].value
    const orderDate = document.getElementsByName('order_date')[0].value
    const orderStatus = document.getElementsByName('order_status')[0].value
    const paymentDate = document.getElementsByName('payment_date')[0].value
    const description = document.getElementsByName('description')[0].value
    const note = document.getElementsByName('note')[0].value

    const deleteFlags = document.getElementsByName('delete_flgs[]')
    const names = document.getElementsByName('outsource_detail_construction_names[]')
    const quantities = document.getElementsByName('outsource_detail_quantities[]')
    const units = document.getElementsByName('outsource_detail_units[]')
    const unitPrices = document.getElementsByName('outsource_detail_unit_prices[]')
    const prices = document.getElementsByName('outsource_detail_prices[]')

    const messageBox = $('#_message-box')[0]
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';     // 一時的にメッセージを入れておく

    // バリデーション本体
    if (partnerCompanyName === ""
            || constructionName === ""
            || siteAddress === ""
            || startDate === ""
            || endDate === ""
            || orderDate === ""
            || paymentDate === ""
            || orderStatus === ""
    ){
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if(partnerCompanyName === ""){
        $('input[name="partner_company_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(constructionName === ""){
        $('input[name="construction_name"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(siteAddress === ""){
        $('input[name="site_address"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(startDate === ""){
        $('input[name="start_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(endDate === ""){
        $('input[name="end_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(orderDate === ""){
        $('input[name="order_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(paymentDate === ""){
        $('input[name="payment_date"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }
    if(orderStatus === ""){
        $('input[name="order_status"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
    }

    // 文字数チェック：発注先業者名
    const maxlen_partnerCompanyName = 100;
    if (partnerCompanyName.length > maxlen_partnerCompanyName){
        // t_msg = '発注先業者名：' + maxlen_partnerCompanyName + '文字以下で入力してください。';
        t_msg = '<p>発注先業者名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：工事件名
    const maxlen_constructionName = 50;
    if (constructionName.length > maxlen_constructionName){
        // t_msg = '工事件名：' + maxlen_constructionName + '文字以下で入力してください。';
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：現場住所
    const maxlen_siteAddress = 150;
    if (siteAddress.length > maxlen_siteAddress){
        // t_msg = '現場住所：' + maxlen_siteAddress + '文字以下で入力してください。';
        t_msg = '<p>現場住所：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：備考
    const maxlen_description = 100;
    if (description.length > maxlen_description){
        // t_msg = '備考：' + maxlen_description + '文字以下で入力してください。';
        t_msg = '<p>備考：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 文字数チェック：注意書き
    const maxlen_note = 100;
    if (note.length > maxlen_note){
        // t_msg = '備考：' + maxlen_description + '文字以下で入力してください。';
        t_msg = '<p>注意書き：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // 合計金額のバリデーション
    const maxlen_total = 11;
    const maxlen_total_with_tax = 11;
    const taxRate = document.getElementById('tax_rate').value;
    let total = 0;
    for (let i=0;i<unitPrices.length;i++){
        if(deleteFlags[i].value === 'false' || deleteFlags[i].value === false){
            total += Number(prices[i].value);
        }
    }

    if(String(total).length > maxlen_total){
        t_msg = '<p>小計：11桁以上の数値は保存できません。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    let tax = NumberUtils.calcTaxAmount(total,taxRate)
    let totalWithTax = total + tax;
    if(String(totalWithTax).length > maxlen_total_with_tax){
        t_msg = '<p>合計金額：11桁以上の数値は保存できません。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }

    // ループ内で参照する一時的なフラグ
    // 同じエラーの場合は飛ばさないと同じエラー文が表示されてしまうため
    let t_overFlag = false;
    let t_blankFlag = false;

    // 文字数チェック, 空欄チャック：工事内容
    const maxlen_detailName = 20;
    t_overFlag = false;
    t_blankFlag = false;
    for (let i = 0; i < names.length; i++) {
        value = names[i].value;
        if(deleteFlags[i].value === 'false'){
            if(String(value).length > maxlen_detailName && !t_overFlag){
                t_msg = '<p>工事内容：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_overFlag = true;
            }else if(value === '' && !t_blankFlag){
                t_msg = '<p>工事内容：入力が完了していません。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_blankFlag = true;
            }
            if(t_overFlag && t_blankFlag){
                break;
            }
        }
    }


    // 桁数チェック, 空欄チャック：数量
    const maxlen_detailQuantities = 11;
    t_overFlag = false;
    t_blankFlag = false;
    for (var i = 0; i < quantities.length; i++) {
        value = quantities[i].value;
        if(deleteFlags[i].value === 'false'){
            if(String(value).length > maxlen_detailQuantities && !t_overFlag){
                t_msg = '<p>数量：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_overFlag = true;
            }else if(value === '' && !t_blankFlag){
                t_msg = '<p>数量：入力が完了していません。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_blankFlag = true;
            }
            if(t_overFlag && t_blankFlag){
                break;
            }
        }
    }

    // 桁数チェック, 空欄チャック：単位
    const maxlen_detailUnits = 11;
    t_overFlag = false;
    t_blankFlag = false;
    for (var i = 0; i < units.length; i++) {
        value = units[i].value;
        if(deleteFlags[i].value === 'false'){
            if(String(value).length > maxlen_detailUnits && !t_overFlag){
                t_msg = '<p>単位：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_overFlag = true;
            }else if(value === '' && !t_blankFlag){
                t_msg = '<p>単位：入力が完了していません。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_blankFlag = true;
            }
            if(t_overFlag && t_blankFlag){
                break;
            }
        }
    }

    // 桁数チェック, 空欄チャック：単価
    const maxlen_detailUnitPrice = 11;
    t_overFlag = false;
    t_blankFlag = false;
    for (var i = 0; i < unitPrices.length; i++) {
        value = unitPrices[i].value;
        if(deleteFlags[i].value === 'false'){
            if(String(value).length > maxlen_detailUnitPrice && !t_overFlag){
                t_msg = '<p>単価：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_overFlag = true;
            }else if(value === '' && !t_blankFlag){
                t_msg = '<p>単価：入力が完了していません。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_blankFlag = true;
            }
            if(t_overFlag && t_blankFlag){
                break;
            }
        }
    }

    // 桁数チェック, 空欄チャック：金額
    const maxlen_detailPrice = 11;
    t_overFlag = false;
    t_blankFlag = false;
    for (var i = 0; i < prices.length; i++) {
        value = prices[i].value;
        if(deleteFlags[i].value === 'false'){
            if(String(value).length > maxlen_detailPrice && !t_overFlag){
                t_msg = '<p>金額：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_overFlag = true;
            }else if(value === '' && !t_blankFlag){
                t_msg = '<p>金額：入力が完了していません。</p>';
                errorMessage += t_msg;
                errorFlag = true;
                t_blankFlag = true;
            }
            if(t_overFlag && t_blankFlag){
                break;
            }
        }
    }


    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
        return true;
    }else{
        return false
    }
}
