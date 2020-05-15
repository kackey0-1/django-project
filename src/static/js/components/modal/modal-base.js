// 継承して使う


class ModalBase{
    params = {};
    callback = null;
    modalContentId;

    /*
    *   modalContentIdでインスタンスが扱うモーダルを設定
    *   showModalで設定したモーダルのdomを表示する
    */
    constructor(modalContentId){
        console.log(modalContentId)
        this.modalContentId = ModalBase.removeFirstLetter(modalContentId, '#');
    }

    // モーダルを表示する
    // callback モーダルが閉じたときに実行されるコールバック
    showModal(modalClosedCallback, params){
        this.params = params;
        this.callback = modalClosedCallback;
        this.modalOpen();
    }

    modalOpen(){
        $('.js-modal#' + this.modalContentId).fadeIn();
    }

    // モーダルを閉じる
    // コールバックも実行する
    modalClose(returnValue){
        if(this.callback){
            this.callback(returnValue);
        }
        $('.js-modal#' + this.modalContentId).fadeOut();
    }

    // ID付与して取得するjQuery
    $(e){
        return $('#' + this.modalContentId + ' ' + e);
    }

    static removeFirstLetter(str, removeLetter){
        let t = String(str);
        let result;
        if(t.slice(0, 1) === removeLetter){
            let len = t.length;
            result = t.slice(1, len);;
        }else{
            result = t;
        }
        return result;
    }
}
