const contractTemplateDic = {
    1: 'none-edit',     // 秘密契約保持
    2: 'none-edit',     // 工事保証書
    3: 'none-edit',     // 工事保障確認書
    4: 'contract-edit', // 工事請負契約書
    5: 'basic-edit',    // 工事請負基本契約書
    6: 'order-edit',    // 工事注文書（基本契約用/約款付）
    7: 'confirm-edit',  // 工事請負書（基本契約用/約款付）
}

// 初期処理
$(function(){
    console.log(contractTemplateDic)
    $('[_templates]').css('display', 'none')

    let targetTemplate = $('._type-select').val()
    console.log($('[_templates="' + contractTemplateDic[targetTemplate] + '"]').toggle())
});

$(function() {
    /*
        契約書種別プルダウン変更時
    */
    $('._type-select').on('change', (e)=>{
        console.log('%ccontract type changed', 'color: lightgreen')
        let contractType = e.target.selectedOptions[0].value    //  プルダウン変更後の値を取得
        let targetTemplate = contractTemplateDic[contractType]  //  dicから使用するtemplateを取得

        // 工事請負契約書のときは工事番号を編集前に戻し、編集不可にする

        if(targetTemplate === 'contract-edit'){
            let defaultConstructionCode = $('#_default-construction-code').val()
            $('[name=construction_code]').val(defaultConstructionCode)
            $('[name=construction_code]').prop('disabled', true)
        }else{
            $('[name=construction_code]').prop('disabled', false)
        }
        $('[_templates]').css('display', 'none')
        $('[_templates="' + targetTemplate + '"]').css('display', '')
    })


    /*
        戻るボタンを押したとき
    */
    $('._back-btn').on('click', (e)=>{
        console.log('back')
        const result = window.confirm("保存していないデータは削除されます。よろしいですか？");
        if (result != true){
            return false;
        }
        window.history.back();
    })

    /*
        削除ボタン押下時の処理
    */
    $('._delete-contract-btn').on('click', (e)=>{
        /** 削除前の確認 */
        const result = window.confirm("入力したデータは全て破棄されます。よろしいですか？");
        if (result != true) {
            return false;
        }
    });

    /*
        保存ボタン押下時
    */
    $('._save-btn').on('click', (e)=>{
        const result = window.confirm("入力された情報は保存されます。よろしいでしょうか。");
        if (result != true) {
            return false;
        }
        // 契約書種別プルダウンで選択されている値によってバリデーションを分ける
        let targetTemplate = contractTemplateDic[$('._type-select').val()]
        switch (targetTemplate) {
            case 'none-edit':
                if (hasValidationErrorDefault()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'contract-edit':
                if (hasValidationErrorForContract()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'basic-edit':
                if (hasValidatioinErrorForBasic()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'order-edit':
                if (hasValidatioinErrorForOrder()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'confirm-edit':
                if (hasValidatioinErrorForConfirm()) {
                    console.log('err')
                    return false;
                }
                break;
        }
    })

    /*
        プレビューボタン押下時の処理
    */
    $('._preview-btn').on('click', (e)=>{
        const result = window.confirm("入力された情報は保存されます。よろしいでしょうか。");
        if (result != true) {
            return false;
        }
        // 契約書種別プルダウンで選択されている値によってバリデーションを分ける
        let targetTemplate = contractTemplateDic[$('._type-select').val()]
        switch (targetTemplate) {
            case 'none-edit':
                if (hasValidationErrorDefault()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'contract-edit':
                if (hasValidationErrorForContract()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'basic-edit':
                if (hasValidatioinErrorForBasic()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'order-edit':
                if (hasValidatioinErrorForOrder()) {
                    console.log('err')
                    return false;
                }
                break;
            case 'confirm-edit':
                if (hasValidatioinErrorForConfirm()) {
                    console.log('err')
                    return false;
                }
                break;
        }
    });
});
