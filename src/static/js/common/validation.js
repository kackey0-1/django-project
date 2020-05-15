class Validation{
    static isBlank(value) {
        if (String(value) === '' || String(value) === null || String(value) === undefined){
            return true;
        }
        return false;
    }

    /**
        value: 検査したい文字列、数値
        maxlen: 許可する最大文字数、桁数
        maxlen以下（maxlenと同じも含む）はfalse
     */
    static isOverLen(value, maxlen){
        if (String(value).length > maxlen){
            return true;
        }
        return false;
    }

    static isOverNumber(value, maxval){
        if(Number(value) > maxval){
            return true;
        }
        return false;
    }


    static isValidDate(value){
        console.log(value)
        if(value !== "") {
            try {
                let dateObj = new Date(value)
                let objStr = dateObj.getFullYear() + "-" + ('00'+(dateObj.getMonth()+1)).slice(-2) + "-" + ('00'+dateObj.getDate()).slice(-2)
                console.log(objStr)
                if(objStr !== value){
                    return true
                }
            } catch(e) {
                return true;
            }
        }
        return false;
    }

    static isBlankInput(inputFormName){
        const e = document.getElementsByName(inputFormName)
        if(e === null || e === undefined || e.length == 0){
            console.error('name属性が' + inputFormName + 'である要素が見つかりません。')
        }
        const value = e[0].value
        if (String(value) === '' || String(value) === null || String(value) === undefined || String(value).length === 0){
            return true;
        }
        return false;
    }

    // 引数で渡されたnameのinput要素がどれかひとつでも空白ならtrueを返す
    /* example
        if(isBlanckAnyInputs('name', 'description', 'tel')){
            // ERROR CASE
        }
    */
    static isBlankAnyInputs(...inputFormNames){
        for(let i = 0; i < inputFormNames.length; i++){
            if(Validation.isBlankInput(inputFormNames[i])){
                return true
            }
        }
        return false
    }

    // inputタグのname属性から検索し、入力されたテキストがmaxlenより大きかったらTrue
    static isOverLenInput(inputFormName, maxlen){
        const e = document.getElementsByName(inputFormName)
        if(e === null || e === undefined || e.length == 0){
            console.error('name属性が' + inputFormName + 'である要素が見つかりません。')
        }
        const value = e[0].value
        if (String(value).length > maxlen){
            return true;
        }
        return false;
    }
}
