$(function() {
  $('#selected-delete-btn').click(function(event) {
    if( getCheckedBoxes('estimation_entry_template_id') ){
      if(confirm('選択したレコードを全て削除してもよろしいですか？')) {
        target_form = $("#selected_delete_form")[0];
        target_form.submit();
      }
    }else{
      alert('削除項目が選択されていません。選択してください。');
    }
  })
});

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0;
}

