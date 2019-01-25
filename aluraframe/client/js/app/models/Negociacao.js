class Negociacao{

    constructor(data, quantidade, valor){
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this); // Protegendo o Objeto, 
                            //fazendo com que ele fique imutável
    }

    get volume(){
        return this._quantidade * this._valor;
    }

    // get data(){
    //     return this._data;
    // }

    //Programação Defensiva
    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}