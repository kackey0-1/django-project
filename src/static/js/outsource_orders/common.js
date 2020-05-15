$(function() {
    $(document).on("change", '._calc-price-trigger', function(){
        // 明細行削除し、invoice_detail_idを持っている要素には削除フラグ=true
        console.log('value changed')
        calcTotalFromUnit()
    })

    $(document).on("change", '._calc-total-trigger', function(){
        // 明細行削除し、invoice_detail_idを持っている要素には削除フラグ=true
        console.log('value changed')
        calcTotalFromPrice()
    })
})

function calcTotalFromUnit(){
    const deleteFlags = document.getElementsByName('delete_flgs[]')
    const unitPrices = document.getElementsByName('outsource_detail_unit_prices[]')
    const quantities = document.getElementsByName('outsource_detail_quantities[]')
    const prices = document.getElementsByName('outsource_detail_prices[]')
    const taxRate = document.getElementById('tax_rate').value

    let total = 0;

    for(let i = 0; i < unitPrices.length; i++){
        if(deleteFlags[i].value === 'false' || deleteFlags[i].value === false){
            total += prices[i].value = unitPrices[i].value * quantities[i].value
            console.log(total)
        }
    }
    let tax = NumberUtils.calcTaxAmount(total, taxRate)
    let totalWithTax = total + tax    
    $('._total').text(StringUtil.addComma(total))
    $('._tax').text(StringUtil.addComma(tax))
    $('._total-with-tax').text(StringUtil.addComma(totalWithTax))
}

function calcTotalFromPrice(){
    const deleteFlags = document.getElementsByName('delete_flgs[]')
    const prices = document.getElementsByName('outsource_detail_prices[]')
    const taxRate = document.getElementById('tax_rate').value
    let total = 0;

    for(let i = 0; i < prices.length; i++){
        if(deleteFlags[i].value === 'false' || deleteFlags[i].value === false){
            total += Number(prices[i].value)
            console.log(total)
        }
    }
    let tax = NumberUtils.calcTaxAmount(total, taxRate)
    let totalWithTax = total + tax
    $('._total').text(StringUtil.addComma(total))
    $('._tax').text(StringUtil.addComma(tax))
    $('._total-with-tax').text(StringUtil.addComma(totalWithTax))
}