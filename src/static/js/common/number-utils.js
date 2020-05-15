
class NumberUtils{
    /*
    *   合計金額, 費用に対する利益率を返す
    */
    static calcProfitRate(total, cost) {
        if (total != 0 || cost != 0){
            return Math.floor(((total - cost) / total * 100) * 100) / 100
        }
        return 0
    }

    /*
    *   合計金額に対する消費税を返す
    */
    static calcTaxAmount(total, taxRate){
        return Math.floor(total * Number(taxRate))
    }
}
