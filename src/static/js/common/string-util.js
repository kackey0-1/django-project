
class StringUtil{
    /*
    *   strの最初の文字がremoveLetterなら、1文字目めremoveLetterを削除したstrを返す
    *   最初の文字がremoveLetter以外ならstrをそのまま返す
    */
    static removeFirstLetter(str, removeLetter){
        t = String(str);
        let result;
        if(t.slice(0, 1) === removeLetter){
            let len = t.length;
            result = t.slice(1, len);;
        }else{
            result = t;
        }
        return result;
    }

    /**
     * カンマの追加
     * target: カンマを付与したい数値
     */
    static addComma(target) {
        let commaData = '';
        let nonCommaData = String(target)
        /**
         * 正規表現
         * \d        => 半角数字
         * \d{3}     => 3桁の半角数字
         * ?=(\d{3}) => \dの後ろに\d{3}がある
         * +(?!\d)   => \d{3}の後ろに\dがない
         * g         => マッチしたべての部分文字列を置換
         * $1        => 変数
         *           => カッコ()で囲われた部分を$1に代入
         * 1234の場合の$1 => 1
         * 1234の場合の$2 => 234
         */
        commaData = nonCommaData.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // 小数点以下のカンマを削除
        if (commaData.search(/\./) !== -1) { // 小数点が含まれている場合
            commaData = StringUtil.removeFloatComma(commaData);
        }
        return commaData;
    }
    /**
     * カンマの削除
     */
    static removeComma(commaData) {
        let nonCommaData = '';
        nonCommaData = commaData.replace(/,/g, ''); // 入力時のカンマを削除
        return nonCommaData;
    }

    /**
     * 小数点以下のカンマの削除
     */
    static removeFloatComma(commaData) {
        let dotBefore = '';
        let dotAfter  = '';
        // 小数点までを取得
        dotBefore = commaData.match(/(.*)\./);
        dotBefore = dotBefore[0];
        dotBefore = dotBefore.replace(/\./g, '')
        // 小数点以降を取得
        dotAfter = commaData.match(/\.(.*)/);
        dotAfter = dotAfter[0];
        dotAfter = dotAfter.replace(/\,/g, '');
        // 小数点前と小数点後を結合
        commaData = dotBefore + dotAfter;
        return commaData;
    }
}
