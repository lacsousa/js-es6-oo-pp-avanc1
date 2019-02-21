class Conta {

    constructor(titular, conta){
        this._titular = titular;
        this._conta = conta;
        this._saldo = 0.0;
    }

    deposita(valor){
        console.log('Valor depositado:', valor);
        this._saldo += valor;
    }

    get saldo(){
        return this._saldo;
    }

    get titular() {
        return this._titular;
    }
    
    // Podemos criar uma espécie de método, mas que é acessado
    // como se fosse uma propriedade.
    get conta() {
        return this._conta;
    }

}

