$(function(){
    //tab display
    path = location.href;
    docType = path.substring(path.indexOf("#", 0) + 1)
    if (docType === "history") {
        $("#history").addClass("active show");
        $('.nav-tabs a[href="#history"]').tab('show')
    } else if (docType === "outsource_orders") {
        $("#outsource_orders").addClass("active show");
        $('.nav-tabs a[href="#outsource_orders"]').tab('show')
    } else if (docType === "quote") {
        $("#quote").addClass("active show");
        $('.nav-tabs a[href="#quote"]').tab('show')
    } else if (docType === "merchandise_orders") {
        $("#merchandise_orders").addClass("active show");
        $('.nav-tabs a[href="#merchandise_orders"]').tab('show')
    } else if (docType === "budgeting") {
        $("#budgeting").addClass("active show");
        $('.nav-tabs a[href="#budgeting"]').tab('show')
    } else {
        $("#schedule").addClass("active show");
        $('.nav-tabs a[href="#schedule"]').tab('show')
    }
    //履歴.追加
    $('._jsConstructionHistoryAddBtn').click(function(event) {
        event.preventDefault();
        $('.error').remove();
        historyForm = $("#construnction_log_form");
        textarea = $(historyForm).find('textarea[name=description]');
        var description = $(textarea).val().trim();
        var max_length = $(textarea).attr('maxlength')
        if (Validation.isBlank(description)) {
            $(textarea).parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }
        message = clean_half_width_length(max_length,description)
        if (message!=''){
            $(textarea).parent().append("<div style='color: red;' class='error'>"+message+"</div>")
            errorFlag = true;
        }
        var error = $('div').hasClass('error');
        if (!error) {
            historyForm.submit()
        }
    });
    //スケジュール.更新
    $("._jsScheduleUpdateBtnClick").click(function(event){
        event.preventDefault();
        form = $('#construnction_schedule_hidden_form')
        var id = $(this).closest('tr').find('input[name=schedule_id]').val().trim();
        var description = $(this).closest('tr').find('input[name=description]').val().trim();
        var expected_date = $(this).closest('tr').find('input[name=expected_date]').val().trim();
        var charge_user_id = $(this).closest('tr').find('select[name=charge_user_id]').val().trim();
        
        if (!validateSchedule(description, expected_date, charge_user_id)){
            $(form).find('input[name=description]').val(description);
            $(form).find('input[name=expected_date]').val(expected_date);
            $(form).find('input[name=charge_user]').val(charge_user_id);
            $(form).find('input[name=id]').val(id);
            $(form).submit()
        }
    });
    //スケジュール.追加
    $("#schedule_new_add_btn").click(function(event){
        event.preventDefault(); 
        form = $('#construction_schedule_form')
        var description = $(form).find('input[name=description]').val().trim();
        var expected_date = $(form).find('input[name=expected_date]').val().trim();
        var charge_user = $(form).find('select[name=charge_user]').val().trim();
        var max_length = $(form).find('input[name=description]').attr('maxlength')
        if (!validateSchedule(description, expected_date, charge_user,max_length)){
            $(form).submit()
        }
    });
    //スケジュール.完了
    $('._jsScheduleStatusBtnClick').click(function(event){
        id = $(this).closest('tr').find('input[name=schedule_id]').val();
        let url = '/constructions/schedule/finish/'
        form = $('#construnction_schedule_hidden_form');
        url =  $(form).attr('action');
        $(form).attr('action', '/constructions/schedule/finish/' + id);
        $(form).submit()
    });

    // 予算管理.合計
    var sum = 0;
    $('._jsCostPrice').each(function() {
        let price = $(this).val();
        // console.log(price);
        if(!isNaN(price) && price.length != 0) {
            sum += parseFloat(price);
        }
        
    });
    
    $('._jsCostPricTotal').text((sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    // 予算管理.更新
    $('#_jsCostTable').on('click', '._jsConstructionCostUpdateBtn', function(event) {
        event.preventDefault();
        let errorFlag = false;
        let errorMessage = '';  // 最終的にHTML上に表示するテキスト
        let t_msg = '';  
        form = $('#construnction_cost_hidden_form')
        var id = $(this).closest('tr').find('input[name=budgeting_id]').val().trim();
        var occured_at = $(this).closest('tr').find('input[name=occured_at]').val().trim();
        var name = $(this).closest('tr').find('select[name=name]').val().trim();
        var price = $(this).closest('tr').find('input[name=price]').val().trim();
        var classification_obj = $(this).closest('tr').find('input[name=classification]')
        var classification = $(classification_obj).val().trim();
        var max_length = $(classification_obj).attr('maxlength');
        if(Validation.isBlank(occured_at) 
            || Validation.isBlank(name)
            || Validation.isBlank(price) 
            || Validation.isBlank(classification))
        {
            errorMessage = '<p>入力が完了していません。</p>';
            errorFlag = true;
        }

        if (Validation.isValidDate(occured_at)){
            t_msg = '<p>日付：入力した日付が保存可能な値でないため、保存できません。再試行してください。</p>';
            errorMessage += t_msg;
            errorFlag = true;
        }
        if(Validation.isOverLen(price, 11)){
            t_msg = '<p>金額：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        message = clean_half_width_length(max_length,classification)
        if (message!=''){
            errorMessage += '<p>種類：'+message+'</p>';
            errorFlag = true;
        }

        if (errorFlag){
            $('#_message-box-budgeting').empty()
            $('#_message-box-budgeting').addClass("alert-danger").append(errorMessage);
        }else{
            $(form).find('input[name=occured_at]').val(occured_at);
            $(form).find('input[name=name]').val(name);
            $(form).find('input[name=price]').val(price);
            $(form).find('input[name=classification]').val(classification);
            $(form).find('input[name=id]').val(id);
            $(form).submit()
        }
    })
     // 予算管理.追加
    $('._jsCostAddTdBtn').click(function(event){
        event.preventDefault();
        templates = "<tr>" +
        "<input type='hidden'  name='budgeting_id'>" +
        "<td><input type='date' name='occured_at' required></td>" +
        "<td><input class='form-control' type='textfield' required name='name'></td>" +
        "<td><input class='form-control' type='number' required name='price'></td>" +
        "<td><input class='form-control' type='textfield' required name='classification'></td>" +
        "<td><button type='button' class='btn_table btn-outline-dark btn-sm _jsConstructionCostUpdateBtn'><i class='fas fa-sync-alt'></i>追加</button></td>"
        "</tr>"
        $('#_jsCostTable tr:last').after(templates);
    });

    $('._jsActualWorkDayUpdateBtn').click(function(event){
        event.preventDefault();
        let errorFlag = false;
        let errorMessage = '';
        let form = $('#_js_actual_work_day_form');
        let actual_work_days = $(form).find('input[name=actual_work_days]').val();
        if (Validation.isBlank(actual_work_days)) {
            errorMessage = '<p>入力が完了していません。</p>';
            errorFlag = true;
        }
        if(Validation.isOverLen(actual_work_days, 11)){
            t_msg = '<p>実働日数：入力した数値が保存可能な数を上回っているため、保存できません。数値を減らして再試行してください。</p>'
            errorMessage += t_msg;
            errorFlag = true;
        }
        if (errorFlag){
            $('#_message-box-budgeting').empty()
            $('#_message-box-budgeting').addClass("alert-danger").append(errorMessage); 
        }else{
            $(form).submit()
        }
    });

    $('._jsFailureReasonUpdateBtn').click(function(event){
        event.preventDefault();
        let errorFlag = false;
        let errorMessage = '';
        let form = $('#construction_form');
        let failure_reason_type = $('#id_failure_reason_type').val();
        if (Validation.isBlank(failure_reason_type)) {
            errorMessage = '<p>理由区分は必須です。</p>';
            errorFlag = true;
        }
        if (errorFlag){
            $('#_message-box-failure_reason').empty()
            $('#_message-box-failure_reason').addClass("alert-danger").append(errorMessage); 
        }else{
            $(form).submit()
        }
    });
  })
  
  function validateSchedule(description,expected_date,charge_user,max_length=200){
    let errorFlag = false;
    let errorMessage = '';
    if(Validation.isBlank(description) || Validation.isBlank(expected_date) || Validation.isBlank(charge_user))
    {
        errorMessage = '<p>入力が完了していません。</p>';
        errorFlag = true;
    }
    if (Validation.isValidDate(expected_date)){
        errorMessage += '<p>予定日：入力した日付が保存可能な値でないため、保存できません。再試行してください。</p>';
        errorFlag = true;
    }
    message = clean_half_width_length(max_length,description)
    if (message!=''){
        errorMessage += '<p>予定内容：'+message+'</p>';
        errorFlag = true;
    }
    if (errorFlag){
        $('#_js_schedule_message-box').empty();
        $('#_js_schedule_message-box').addClass("alert-danger").append(errorMessage);
    }

    return errorFlag
  }

function clean_half_width_length(max_length, target_str){
    let error_msg='';
    //  max_lengthを半角最大値として扱う
    var half_width_max_length = max_length;
    var full_width_max_length = half_width_max_length / 2;
    var count = target_str.bytes();
    if (count > max_length){
        error_msg = '全角'+full_width_max_length+'文字相当、半角'+half_width_max_length+'文字相当以内で入力してください。'
    }
    return error_msg
}
String.prototype.bytes = function () {
var length = 0;
for (var i = 0; i < this.length; i++) {
    var c = this.charCodeAt(i);
    if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
    length += 1;
    } else {
    length += 2;
    }
}
return length;
}
