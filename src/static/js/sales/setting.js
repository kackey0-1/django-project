$(function() {
    $('.btn-create').click(function() {
        $('.error').remove();
        var target_sales_amount = $('input[name="target_sales_amount"]').val();
        var target_gross_profit = $('input[name="target_gross_profit"]').val();
        var target_operating_income = $('input[name="target_operating_income"]').val();
        var target_sales_amount_len = $('input[name="target_sales_amount"]').val().length;
        var target_gross_profit_len = $('input[name="target_gross_profit"]').val().length;
        var target_operating_income_len = $('input[name="target_operating_income"]').val().length;

        if (!target_sales_amount) {
            $('input[name="target_sales_amount"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");
        }

        if (target_sales_amount_len>11){
            $('input[name="target_sales_amount"]').parent().append("<div style='color: red;' class='error'>11桁以下で入力してください。</div>");    
        }

        if (!target_gross_profit) {
            $('input[name="target_gross_profit"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");    
        }

        if (target_gross_profit_len>11){
            $('input[name="target_gross_profit"]').parent().append("<div style='color: red;' class='error'>11桁以下で入力してください。</div>");    
        }

        if (!target_operating_income) {
            $('input[name="target_operating_income"]').parent().append("<div style='color: red;' class='error'>必須項目です。</div>");    
        }

        if (target_operating_income_len>11){
            $('input[name="target_operating_income"]').parent().append("<div style='color: red;' class='error'>11桁以下で入力してください。</div>");    
        }

        var error = $('div').hasClass('error');
        if (error) {
            return false;
        }

        var result = window.confirm("登録します。よろしいでしょうか？");
        if (result != true) {
            return false;
        }
    });
});
$('select[name="target_years_month"]').change(function() {
        var url = '/sales/get_select_month';
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        var target_years_month = $(this).val();

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {name: target_years_month},
            headers: {'X-CSRFToken': csrftoken},
            timeout: 3000,
        }).done(function(data) {
            $('input[name="target_sales_amount"]').val(data.target_sales_amount);
            $('input[name="target_gross_profit"]').val(data.target_gross_profit);
            $('input[name="target_operating_income"]').val(data.target_operating_income);
            
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {

        });
});