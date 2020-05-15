$(function(){
  $('._jsEstimateDetailAddTrBtn').click(function(event){
    event.preventDefault();
    var max_rows = 200;
    var len = $("#_jsEstimateMasterDetailTemplateTable tbody").children().length;
    if(len>=max_rows){
      alert('明細行は最大'+max_rows+'行です。');
      return;
    }
    //下記0行目取得して複製する処理
    let templates = $('#_jsEstimateMasterDetailTemplateTable tbody tr:first').clone();
    $(templates).find("input").val("").end();
    $(templates).find('select option').removeAttr('selected');
    $(templates).find('ul').remove();
    let td_first = $(templates).find('td:first');
    let hidden = $(td_first).find('input:hidden');
    $(td_first).text(len + 1);
    $(td_first).append('<input type="hidden" name="'+hidden.attr('name')+'" id="'+hidden.attr('id')+'">')

    $(templates).find("input").each(function() {
        let name = $( this ).attr('name').replace('_set-0-','_set-'+len+'-');
        let id = $( this ).attr('id').replace('_set-0-','_set-'+len+'-');
        $( this ).attr('name',name);
        $( this ).attr('id',id);
      });

      $(templates).find("select").each(function() {
        let name = $( this ).attr('name').replace('_set-0-','_set-'+len+'-');
        let id = $( this ).attr('id').replace('_set-0-','_set-'+len+'-');
        $( this ).attr('name',name);
        $( this ).attr('id',id);
      });
    $(templates).appendTo('#_jsEstimateMasterDetailTemplateTable');
    let inital_form_num = parseInt($('#id_estimationentrydetailtemplates_set-TOTAL_FORMS').val()) + 1;
    $('#id_estimationentrydetailtemplates_set-TOTAL_FORMS').val(inital_form_num)
  });
})
