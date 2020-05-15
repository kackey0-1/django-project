$(function() {
    $('.btn-search').click(function() {
        $('.error').remove();
        var kana = $('input[name="kana"]').val();
        var kana_len = kana.length;
        if (kana) {
            if (!kana.match(/^[\u3040-\u309f]+$/)) {
                $('#search').parent().append("<div style='color: red;' class='error'>ひらがなで入力してください。</div>");
            } else if (kana_len > 20) {
                $('#search').parent().append("<div style='color: red;' class='error'>20文字以内で入力してください。</div>");  
            }
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }
    });

    $('.btn-choice-delete').click(function() {
        var checked = $('input[type="checkbox"]:checked').length;

        if (!checked) {
            var result = window.confirm("削除するユーザーを選択してください。");
            return false;
        }

        var result = window.confirm("削除します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
});