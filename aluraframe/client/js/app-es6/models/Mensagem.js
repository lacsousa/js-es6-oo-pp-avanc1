class Mensagem{

    constructor(texto=''){ //ES6 deixa vc passar um valor default se não 
                           // for passado nenhum valor 
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}