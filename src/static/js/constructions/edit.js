$(function(){
  // PC削除ボタン
  $('#construction-delete-btn').click(function(event) {
      if(confirm('削除してもよろしいですか？')) {
        target_form = $("#construction_form")[0]
        location.href='/constructions/delete/'+target_form.id_id.value
      }
  });

  // PC保存ボタン
  $('#construction-save-btn').click(function(event){
    event.preventDefault();
    let form = $('#construction_form')[0];
    let status = $('#id_progress_status').val();
    //不成立
    if (status == 6){
      $('#failureReasonModal').modal('show');
    }else {
      $(form).submit();
    }
  })

  // 顧客情報ロードボタン
  $('#load-client-data-btn').click(function(event) {
    // 顧客名
    $('#id_client_name').val(latest_client_data.name);
    // 顧客TEL
    $('#id_client_tel').val(latest_client_data.tel);
    // 顧客住所
    $('#id_client_address').val(latest_client_data.address);
  });

  // PC削除ボタン
  $('#sp-construction-delete-btn').click(function(event) {
      if(confirm('削除してもよろしいですか？')) {
        target_form = $("#sp_construction_form")[0]
        location.href='/constructions/delete/'+target_form.id_id.value
      }
  });

  // PC保存ボタン
  $('#sp-construction-save-btn').click(function(event){
    event.preventDefault();
    let form = $('#sp_construction_form')[0];
    $(form).submit();
  })

  // SPスケジュール追加
  $('#sp-schedule-add-btn').click(function(event){
    event.preventDefault();
    let form = $('#sp_schedule_add_form');
    var description = $(form).find('input[name=description]').val().trim();
    var expected_date = $(form).find('input[name=expected_date]').val().trim();
    var charge_user = $(form).find('select[name=charge_user]').val().trim();
    var max_length = $(form).find('input[name=description]').attr('maxlength')
    if (!validateScheduleAdd(description, expected_date, charge_user,max_length)){
        $(form).submit()
    }
  })


  // SPスケジュール追加
  $('._jsSpScheduleChangeChargeUser').each(function(index, element){
    $(element).change(function(event){
      var id = $(this).closest('tr').find('input[name=schedule_id]').val().trim();
      let form = $('#sp_schedule_edit_form')
      $(form).find('input[name=charge_user]').val(this.value);
      $(form).find('input[name=id]').val(id);
      if (!validateScheduleChangeChargeUser(this.value)){
          $(form).submit()
      }
    });
  })

  // SPスケジュール完了
  $('._jsSpScheduleStatusBtnClick').click(function(event){
    event.preventDefault();
    id = $(this).closest('tr').find('input[name=schedule_id]').val();
    let form = $('#sp_schedule_edit_form')
    $(form).attr('action', '/constructions/sp_schedule_finish/' + id);
    $(form).submit();
  })


  function validateScheduleChangeChargeUser(charge_user){
    let errorFlag = false;
    let errorMessage = '';
    if(Validation.isBlank(charge_user))
    {
        errorMessage = '<p>有効な担当者を選択してください</p>';
        errorFlag = true;
    }
    if (errorFlag){
        $('#sp_schedule_save_message-box').empty();
        $('#sp_schedule_save_message-box').addClass("alert-danger").append(errorMessage);
    }

    return errorFlag
  }

  function validateScheduleAdd(description,expected_date,charge_user,max_length=200){
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
        $('#sp_schedule_add_message-box').empty();
        $('#sp_schedule_add_message-box').addClass("alert-danger").append(errorMessage);
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
})
