$(function() {    

    /** 消去ボタン押下時の処理 */
    $('._estimate-delete-btn').on('click', function() {
        const estimation_id = $(this).val();
        const result = window.confirm("入力したデータは全て破棄されます。よろしいですか？");
        /** 削除前の確認 */
        if (result != true) {
            return false;
        }
        const url = "/estimates/delete/"+estimation_id;
        window.location.href = url;
        return false;
    });

    /** 戻るボタン押下時の処理 */
    $('._go_back_btn').on('click', function(){
        const result = window.confirm("保存していないデータは削除されます。よろしいですか？");
        if (result != true){
            return false;
        }
        window.history.back();
        window.name = "loaded";
    })

    /** 保存ボタン押下時の処理 */
    $('._estimate-save-button').on('click', function(){
        $('.error').remove();
        if(saveValidate()) {
            return false;
        }
    });

    /** プレビューボタン押下時の処理 */
    $('._estimate-preview-btn').on('click', function(){
        $('.error').remove();
        const result = window.confirm("入力された情報は保存されます。よろしいでしょうか。");
        if (result != true) {
            return false;
        }
        if (saveValidate()) {
            return false;
        }
    });

    /** 内訳削除ボタン押下時の処理 */
    $(document).on("click", '._delete-entry-btn', function(){
        // 明細行削除し、要素には削除フラグ=true
        const deleteRow = $(this).parent().parent().parent()
        deleteRow.toggle()
        deleteRow.find("[name='entry_delete_flgs']").val("true")
        let target = deleteRow
        for(i=0; i<deleteRow.nextAll().length; i++) {
            target = target.next()
            if(target.attr("class") === undefined || !target.attr("class").includes('_estimation-entry-detail')){
                break;
            }
            target.find("[name='detail_delete_flgs']").val("true")
            target.addClass('_hidden_row')
        }
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })

    /** 明細削除ボタン押下時の処理 */
    $(document).on("click", '._delete-detail-btn', function(){
        // 明細行削除し、要素には削除フラグ=true
        const target = $(this).parent().parent().parent()
        target.toggle()
        target.find("[name='detail_delete_flgs']").val("true")

        // 明細チェック用の変数:値が2の場合内訳削除処理実施
        let entryDeleteCheck = 0
        if (target.nextAll().length === 0) {
            entryDeleteCheck += 1;
        }
        //直後の行が削除フラグTrueかつ内訳行の場合
        let nextRow = target.next()
        for(i=0; i<target.nextAll().length; i++) {
            if(nextRow.attr("class") === undefined || !nextRow.attr("class").includes('_estimation-entry-detail')){
                entryDeleteCheck += 1;
                break;
            } else if(nextRow.attr("class").includes('_estimation-entry-detail') && nextRow.find("[name='detail_delete_flgs']").val() === "false") {
                break;
            }
            nextRow = nextRow.next()
        }
        //直前の全ての明細行が削除フラグTrueかつ内訳行の場合
        let prevRow = target.prev()
        for(i=0; i<target.prevAll().length; i++) {
            if(prevRow.attr("class") === undefined
                || (!prevRow.attr("class").includes('_estimation-entry-detail') && prevRow.attr("class").includes('_estimation-entry'))){
                entryDeleteCheck += 1;
                if(entryDeleteCheck===2){
                    prevRow.find("[name='entry_delete_flgs']").val("true")
                    prevRow.addClass('_hidden_row')
                    break;
                }
                break;
            } else if(prevRow.attr("class").includes('_estimation-entry-detail') && prevRow.find("[name='detail_delete_flgs']").val() === "false"){
                break;
            }
            prevRow = prevRow.prev()
        }
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })

    $(document).on("click", "._accordion-btn", function(){
        if ($(this).val() === "+"){
            $(this).val("-")
        } else {
            $(this).val("+")
        }
        let target = $(this).parent().parent().parent()
        let nextRow = target.next()
        for(i=0; i<target.nextAll().length; i++) {
            if(nextRow.attr("class") === undefined || !nextRow.attr("class").includes('_estimation-entry-detail')){
                break;
            }
            if(nextRow.find("[name='entry_delete_flgs']").val() !== "true") {
                if ($(this).val() === "+"){
                    nextRow.addClass('_hidden_row')
                } else {
                    nextRow.removeClass('_hidden_row')
                }
            }
            nextRow = nextRow.next()
        }
    })

    /** 色変更ボタン押下時の処理 */
    $('._estimate-colored-btn').on('click', function(){
        if ($(this).parent().parent().find("[name='entry_colored_flgs']").val() === '0'){
            $(this).parent().parent().find("[name='entry_colored_flgs']").val(1)
            $(this).parent().parent().parent().find("[name='entry_descriptions']").css('color', 'red')
        } else {
            $(this).parent().parent().find("[name='entry_colored_flgs']").val(0)
            $(this).parent().parent().parent().find("[name='entry_descriptions']").css('color', 'black')
        }
        if ($(this).parent().parent().find("[name='detail_colored_flgs']").val() === '0'){
            $(this).parent().parent().find("[name='detail_colored_flgs']").val(1)
            $(this).parent().parent().parent().find("[name='detail_descriptions']").css('color', 'red')
        } else {
            $(this).parent().parent().find("[name='detail_colored_flgs']").val(0)
            $(this).parent().parent().parent().find("[name='detail_descriptions']").css('color', 'black')
        }
    })


    /** モーダル画面の処理: モーダル画面表示 */
    let searchTemplateModal = new SearchEstimationTemplatesModal('_search-estimation-templates-modal');
    $('.js-modal-close').on('click', ()=>{
        $('._newRow').remove()
        searchTemplateModal.modalClose();
    })
    $('._estimation_template_search_btn').on('click', ()=>{
        $('._newRow').remove()
        searchTemplateModal.showModal((params)=>{
            if(params){
                params.forEach(param => {
                    // 新規登録の場合EntryDetailデータ作成時にEntryIdが必要になるため一意の値を保持する
                    let newEntryId = Number(document.getElementById('_new_entry_id').value)
                    document.getElementById('_new_entry_id').value = newEntryId + 1
                    let template = JSON.parse(param)
                    if(template.estimationEntryTemplate){
                        let addElement = $('._hidden_estimation-entry').clone()
                        addElement.removeClass('_hidden_estimation-entry')
                        // 画面入力項目
                        addElement.find("[name='entry_quantities']").val(1)
                        addElement.find("[name='entry_delete_flgs']").val("false")
                        addElement.find("[name='entry_names']").val(template.estimationEntryTemplate.name)
                        addElement.find("[name='estimation_entry_ids']").val("new_entry_id-" + newEntryId)
                        $('#_estimation-content').append(addElement)
                    }
                    if(template.estimationEntryDetailTemplate){
                        template.estimationEntryDetailTemplate.forEach(detail => {
                            let addElement = $('._hidden_estimation-entry-detail').clone()
                            addElement.removeClass('_hidden_estimation-entry-detail')
                            $('#_estimation-content').append(addElement)
                            // 画面入力項目
                            addElement.find("[name='entry_id_for_details']").val("new_entry_id-" + newEntryId)
                            addElement.find("[name='detail_delete_flgs']").val("false")
                            addElement.find("[name='detail_names']").val(detail.name)
                            addElement.find("[name='detail_project_types']").val(detail.project_type)
                            addElement.find("[name='detail_quantities']").val(1).change() //detail.quantity
                            addElement.find("[name='detail_units']").val(detail.unit)
                            addElement.find("[name='detail_prices']").val(detail.price).change()
                            addElement.find("[name='detail_nominal_units']").val(detail.nominal_unit).change()
                            addElement.find("[name='detail_nominal_quantities']").val(1).change()//detail.nominal_quantity
                            addElement.find("[name='detail_costs']").val(detail.cost).change()
                            addElement.find("[name='detail_descriptions']").val(detail.description)
                        })
                    }
                })
            }
        })
    })

    /**
        明細金額変更時の処理
    */
    // 明細#数量変更時の処理
    $(document).on("change", '._detail_quantities', function(){
        // 明細の金額再計算メソッド呼び出し
        calcDetailBalance(this)
        // 内訳計算用にID取得
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
    // 明細#単価変更時の処理
    $(document).on("change", '._detail_prices', function(){
        // 明細の金額再計算メソッド呼び出し
        calcDetailBalance(this)
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
    // 明細#原価数量変更時の処理
    $(document).on("change", '._detail_nominal_quantities', function(){
        // 明細の金額再計算メソッド呼び出し
        calcDetailBalance(this)
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
    // 明細#原価単価変更時の処理
    $(document).on("change", '._detail_costs', function(){
        // 明細の金額再計算メソッド呼び出し
        calcDetailBalance(this)
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
    // 内訳#金額変更時の処理
    $(document).on("change", '._detail_totals', function(){
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
    // 内訳#原価金額変更時の処理
    $(document).on("change", '._detail_cost_totals', function(){
        // 内訳の金額再計算メソッド呼び出し
        calcEntryBalance(this)
        // 見積書の金額計算メソッド呼び出し
        calcEstimateBalance()
    })
});

/*
    明細: 単価、金額、粗利、原価金額、粗利率数値の再計算メソッド
*/
function calcDetailBalance(_this){
    // price * quantity
    const total = Number($(_this).parent().parent().parent().find("[name='detail_prices']").val()) * Number($(_this).parent().parent().parent().find("[name='detail_quantities']").val())
    // cost * nominal_quantity
    const cost = Number($(_this).parent().parent().parent().find("[name='detail_costs']").val()) * Number($(_this).parent().parent().parent().find("[name='detail_nominal_quantities']").val())
    // 明細の再計算
    $(_this).parent().parent().parent().find("[name='detail_totals']").val(total)
    $(_this).parent().parent().parent().find("[name='detail_cost_totals']").val(cost)
    $(_this).parent().parent().parent().find("[name='detail_gross_profits']").val(total - cost)
    $(_this).parent().parent().parent().find("[name='detail_gross_profit_rates']").val(calcProfitRate(total, cost))
}

/*
    内訳: 単価、金額、粗利、原価金額、粗利率数値の再計算メソッド
*/
function calcEntryBalance(_this){
    // const targetEntry = document.getElementsByClassName('_estimation-entry' + entry_id)[0]
    // 内訳#金額計算用
    let total = 0
    // 内訳#単価計算用
    let priceTotal = 0
    // 内訳#原価金額計
    let costTotal = 0

    let target = $(_this).parent().parent().parent()
    // イベント対象行が削除対象かを判定
    if (target.attr("class") !== undefined && target.find("[name='detail_delete_flgs']").val() === "false"){
        priceTotal += Number(target.find("[name='detail_prices']").val())
        total += Number(target.find("[name='detail_totals']").val())
        costTotal += Number(target.find("[name='detail_cost_totals']").val())
    }
    for(i=0; i< $(_this).parent().parent().parent().nextAll().length; i++){
        // 明細の再計算
        target = target.next()
        if(target.attr("class") === undefined || !target.attr("class").includes('_estimation-entry-detail')){
            break;
        }
        // 削除対象行かを判定
        if (target.attr("class") !== undefined && target.find("[name='detail_delete_flgs']").val() === "false"){
            priceTotal += Number(target.find("[name='detail_prices']").val())
            total += Number(target.find("[name='detail_totals']").val())
            costTotal += Number(target.find("[name='detail_cost_totals']").val())
        }
    }
    target = $(_this).parent().parent().parent()
    for(i=0; i<$(_this).parent().parent().parent().prevAll().length; i++){
        // 明細の再計算
        target = target.prev()
        if(target.attr("class") === undefined || !target.attr("class").includes('_estimation-entry-detail')){
            target.find("[name='entry_totals']").val(total)
            target.find("[name='entry_prices']").val(priceTotal)
            target.find("[name='entry_cost_totals']").val(costTotal)
            target.find("[name='entry_gross_profits']").val(total - costTotal)
            target.find("[name='entry_gross_profit_rates']").val(calcProfitRate(total, costTotal))
            break;
        }
        // 削除対象行かを判定
        if (target.attr("class") !== undefined && target.find("[name='detail_delete_flgs']").val() === "false"){
            priceTotal += Number(target.find("[name='detail_prices']").val())
            total += Number(target.find("[name='detail_totals']").val())
            costTotal += Number(target.find("[name='detail_cost_totals']").val())
        }
    }
    console.log("###################")
    console.log("単価合計:" + priceTotal)
    console.log("合計金額:" + total)
    console.log("原価合計:" + costTotal)
}

/*
    見積書: 内訳合計、消費税、合計金額、原価合計、原価合計、税別粗利、粗利率の再計算メソッド
*/
function calcEstimateBalance() {
    const targetEntries = document.getElementsByClassName('_estimation-entry')
    const taxRate = document.getElementById('tax_rate').value
    // 見積書#合計金額計算用
    let total = 0
    // 見積書#原価合計計算用
    let costTotal = 0
    for(i=0; i<targetEntries.length; i++) {
        let deleteFlag = targetEntries[i].querySelector("input[name='entry_delete_flgs']").value
        // 削除フラグが立っていないもののみ計算対象
        if(deleteFlag !== "true") {
            total += Number(targetEntries[i].querySelector("input[name='entry_totals']").value)
            costTotal += Number(targetEntries[i].querySelector("input[name='entry_cost_totals']").value)
        }
    }
    let tax = Math.floor(total * Number(taxRate))
    document.getElementById("estimate_total").textContent = StringUtil.addComma(total)
    document.getElementById("estimate_tax").textContent = StringUtil.addComma(tax)
    document.getElementById("estimate_total_with_tax").textContent = StringUtil.addComma(total + tax)
    document.getElementById("estimate_cost_total").textContent = StringUtil.addComma(costTotal)
    document.getElementById("estimate_gross_profit").textContent = StringUtil.addComma(total - costTotal)
    document.getElementById("estimate_gross_profit_rate").textContent = StringUtil.addComma(calcProfitRate(total, costTotal))
}

function calcProfitRate(total, cost) {
    if (total != 0 || cost != 0){
        return Math.floor(((total - cost) / total * 100) * 100) / 100
    }
    return 0
}

function saveValidate(){
    const messageBox = document.getElementById('_message-box')
    messageBox.innerHTML = ""
    let errorFlag = false;
    let errorMessage = '';  // 最終的にHTML上に表示するテキスト
    let t_msg = '';     // 一時的にメッセージを入れておく

    /** 見積情報 */
    const clientName = document.getElementsByName('client_name')[0].value
    const contractorName = document.getElementsByName('contractor_name')[0].value
    const constructionName = document.getElementsByName('construction_name')[0].value
    const constructionDays = document.getElementsByName('construction_days')[0].value
    const status = document.getElementsByName('status')[0].value
    const summary = document.getElementsByName('summary')[0].value
    const salesUserName = document.getElementsByName('sales_user_name')[0].value
    const accountantUserName = document.getElementsByName('accountant_user_name')[0].value
    const submissionDate = document.getElementsByName('submission_date')[0].value
    /** 内訳情報 */
    const entryDeleteFlgs = document.getElementsByName('entry_delete_flgs')
    const entryNames = document.getElementsByName('entry_names')
    const entryQuantities = document.getElementsByName('entry_quantities')
    const entryUnits = document.getElementsByName('entry_units')
    const entryPrices = document.getElementsByName('entry_prices')
    const entryDescriptions = document.getElementsByName('entry_descriptions')
    /** 内訳明細情報 */
    const detailDeleteFlgs = document.getElementsByName('detail_delete_flgs')
    const detailNames = document.getElementsByName('detail_names')
    const detailProjectTypes = document.getElementsByName('detail_project_types')
    const detailQuantities = document.getElementsByName('detail_quantities')
    const detailUnits = document.getElementsByName('detail_units')
    const detailPrices = document.getElementsByName('detail_prices')
    const detailTotals = document.getElementsByName('detail_totals')
    const detailNominalQuantities = document.getElementsByName('detail_nominal_quantities')
    const detailNominalUnits = document.getElementsByName('detail_nominal_units')
    const detailCosts = document.getElementsByName('detail_costs')
    const detailCostTotals = document.getElementsByName('detail_cost_totals')
    const detailDescriptions = document.getElementsByName('detail_descriptions')


    if (clientName === ""
        || contractorName === ""
        || constructionName === ""
        || constructionDays === ""
        || constructionName === ""
        || status ===""
        || salesUserName === ""
        || accountantUserName === ""
    ){
            t_msg = '<p>入力が完了していません。</p>'
            errorMessage += t_msg
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
   if(constructionDays===""){
        $('input[name="construction_days"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
   }
   if(status===""){
        $('select[name="status"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
   }
   if(salesUserName===""){
        $('select[name="sales_user_name"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
   }
   if(accountantUserName===""){
        $('select[name="accountant_user_name"]').parent().append("<div style='color: red;' class='error'>選択してください。</div>");
   }

    // 文字数チェック:顧客名
    var maxlen_clientName;
    if ( !clientName.match(/^(\w| |'|,|&)+$/) ){
         maxlen_clientName = 100;
    }else{
        maxlen_clientName = 200;
    }
    if (Validation.isOverLen(clientName, maxlen_clientName)){
        // t_msg = '顧客名:' + maxlen_constructionName + '文字以下で入力してください。';
        t_msg = '<p>顧客名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:契約者名
    var maxlen_contractorName;
    if ( !contractorName.match(/^(\w| |'|,|&)+$/) ){
        maxlen_contractorName = 100;
    }else{
        maxlen_contractorName = 200;
    }
    if (Validation.isOverLen(contractorName, maxlen_contractorName)){
        t_msg = '<p>契約者名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:工事件名
    var maxlen_constructionName = 50;
    if (Validation.isOverLen(constructionName, maxlen_constructionName)){
        t_msg = '<p>工事件名：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 最大数チェック:工事日数
    const maxlen_constructionDays = 999;
    if (Validation.isOverNumber(constructionDays, maxlen_constructionDays)){
        t_msg = '<p>工事日数：入力した数値が保存可能な日数を上回っているため、保存できません。数値を減らして再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 日付チェック:見積提出日
    if (Validation.isValidDate(submissionDate)){
        t_msg = '<p>見積提出日：入力した日付が保存可能な値でないため、保存できません。再試行してください。</p>';
        errorMessage += t_msg;
        errorFlag = true;
    }
    // 文字数チェック:摘要
    var maxlen_summary = 100;
    if(Validation.isOverLen(summary, maxlen_summary)){
        t_msg = '<p>摘要：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
        errorMessage += t_msg;
        errorFlag = true;
    }

    /* 内訳チェック */
    for (let i = 0; i<entryDeleteFlgs.length; i++){
        if (entryDeleteFlgs[i].value === "true"){
            continue;
        }
        /** 文字数チェック:名称 */
        var maxlen_entryNames;
        if ( !entryNames[i].value.match(/^(\w| |'|,|&)+$/) ){
            maxlen_entryNames = 13;
        }else{
            maxlen_entryNames = 25;
        }
        if(Validation.isOverLen(entryNames[i].value, maxlen_entryNames)){
            t_msg = '<p>[内訳]名称：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 桁数チェック:数量 */
        const maxlen_entryQuantities = 99999999999;
        if(Validation.isOverNumber(entryQuantities[i].value, maxlen_entryQuantities)){
            t_msg = '<p>[内訳]数量：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:単位 */
        const maxlen_entryUnits = 100;
        if(Validation.isOverLen(entryUnits[i].value, maxlen_entryUnits)){
            t_msg = '<p>[内訳]単位：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 桁数チェック:単価 */
        const maxlen_entryPrices = 11;
        if(Validation.isOverLen(entryPrices[i].value, maxlen_entryPrices)){
            t_msg = '<p>[内訳]単価：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 桁数チェック:備考 */
        var maxlen_entryDescriptions;
        if ( !entryDescriptions[i].value.match(/^(\w| |'|,|&)+$/) ){
            maxlen_entryDescriptions = 13;
        }else{
            maxlen_entryDescriptions = 25;
        }
        if(Validation.isOverNumber(entryDescriptions[i].value, maxlen_entryDescriptions)){
            t_msg = '<p>[内訳]備考：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:名称 */
        if(Validation.isBlank(entryNames[i].value)){
            t_msg = '<p>[内訳]名称：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 桁数チェック:数量 */
        if(Validation.isBlank(entryQuantities[i].value)){
            t_msg = '<p>[内訳]数量：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:単位 */
        if(Validation.isBlank(entryUnits[i].value)){
            t_msg = '<p>[内訳]単位：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 桁数チェック:単価 */
        if(Validation.isBlank(entryPrices[i].value)){
            t_msg = '<p>[内訳]単価：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
    }
    /* 内訳明細チェック */
    for (let i = 0; i<detailDeleteFlgs.length; i++){
        if (detailDeleteFlgs[i].value === "true"){
            continue;
        }
        /** 文字数チェック:名称 */
        var maxlen_detailNames;
        if ( !detailNames[i].value.match(/^(\w| |'|,|&)+$/) ){
            maxlen_detailNames = 13;
        }else{
            maxlen_detailNames = 25;
        }
        if(Validation.isOverLen(detailNames[i].value, maxlen_detailNames)){
            t_msg = '<p>[内訳明細]名称：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:仕様 */
        var maxlen_detailProjectTypes;
        if ( !detailProjectTypes[i].value.match(/^(\w| |'|,|&)+$/) ){
            maxlen_detailProjectTypes = 25;
        }else{
            maxlen_detailProjectTypes = 50;
        }
        if(Validation.isOverLen(detailProjectTypes[i].value, maxlen_detailProjectTypes)){
            t_msg = '<p>[内訳明細]仕様：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大数値チェック:数量 */
        const maxlen_detailQuantities = 99999999999;
        if(Validation.isOverNumber(detailQuantities[i].value, maxlen_detailQuantities)){
            t_msg = '<p>[内訳明細]数量：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:単位 */
        const maxlen_detailUnits = 100;
        if(Validation.isOverLen(detailUnits[i].value, maxlen_detailUnits)){
            t_msg = '<p>[内訳明細]単位：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大桁チェック:単価 */
        const maxlen_detailPrices = 11;
        if(Validation.isOverLen(detailPrices[i].value, maxlen_detailPrices)){
            t_msg = '<p>[内訳明細]単価：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大桁チェック:金額 */
        const maxlen_detailTotals = 11;
        if(Validation.isOverLen(detailTotals[i].value, maxlen_detailTotals)){
            t_msg = '<p>[内訳明細]金額：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大数値チェック:原価数量 */
        const maxlen_detailNominalQuantities = 99999999999;
        if(Validation.isOverNumber(detailNominalQuantities[i].value, maxlen_detailNominalQuantities)){
            t_msg = '<p>[内訳明細]原価数量：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:原価単位 */
        const maxlen_detailNominalUnits = 100;
        if(Validation.isOverLen(detailNominalUnits[i].value, maxlen_detailNominalUnits)){
            t_msg = '<p>[内訳明細]原価単位：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大桁チェック:原価単価 */
        const maxlen_detailCosts = 11;
        if(Validation.isOverLen(detailCosts[i].value, maxlen_detailCosts)){
            t_msg = '<p>[内訳明細]原価単価：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 最大桁チェック:原価金額 */
        const maxlen_detailCostTotals = 11;
        if(Validation.isOverLen(detailCostTotals[i].value, maxlen_detailCostTotals)){
            t_msg = '<p>[内訳明細]原価金額：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 文字数チェック:備考 */
        var maxlen_detailDescriptions;
        if ( !detailDescriptions[i].value.match(/^(\w| |'|,|&)+$/) ){
            maxlen_detailDescriptions = 13;
        }else{
            maxlen_detailDescriptions = 25;
        }
        if(Validation.isOverLen(detailDescriptions[i].value, maxlen_detailDescriptions)){
            t_msg = '<p>[内訳明細]備考：入力した文字列が保存可能な文字数を上回っているため、保存できません。文字数を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:名称 */
        if(Validation.isBlank(detailNames[i].value)){
            t_msg = '<p>[内訳明細]名称：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:仕様 */
        if(Validation.isBlank(detailProjectTypes[i].value)){
            t_msg = '<p>[内訳明細]仕様：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:数量 */
        if(Validation.isBlank(detailQuantities[i].value)){
            t_msg = '<p>[内訳明細]数量：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:単位 */
        if(Validation.isBlank(detailUnits[i].value)){
            t_msg = '<p>[内訳明細]単位：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:単価 */
        if(Validation.isBlank(detailPrices[i].value)){
            t_msg = '<p>[内訳明細]単価：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:金額 */
        if(Validation.isBlank(detailTotals[i].value)){
            t_msg = '<p>[内訳明細]金額：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:原価数量 */
        if(Validation.isBlank(detailNominalQuantities[i].value)){
            t_msg = '<p>[内訳明細]原価数量：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:原価単位 */
        if(Validation.isBlank(detailNominalUnits[i].value)){
            t_msg = '<p>[内訳明細]原価単位：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:原価単価 */
        if(Validation.isBlank(detailCosts[i].value)){
            t_msg = '<p>[内訳明細]原価単価：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        /** 空白チェック:原価金額 */
        if(Validation.isBlank(detailCostTotals[i].value)){
            t_msg = '<p>[内訳明細]原価金額：入力が完了していません。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
    }  
    if(errorFlag){
        messageBox.innerHTML = errorMessage;
        messageBox.classList.add('alert-danger');
    }
    return errorFlag
}
