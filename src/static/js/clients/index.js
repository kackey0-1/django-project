$(function() {
    $('.btn-choice-delete').click(function() {
        var checked = $('input[type="checkbox"]:checked').length;

        if (!checked) {
            var result = window.confirm("削除する顧客データを選択してください。");
            return false;
        }

        var result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
});