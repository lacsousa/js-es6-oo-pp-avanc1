class Conta2 { 
    
    constructor(saldo=0.0){
        this._saldo = saldo;
    }

    get saldo(){
        return this._saldo;
    }

    atualiza(taxa){
        throw new Error('O método atualiza(taxa) deve ser implementado!');
    }
}

class ContaCorrente extends Conta2{

    atualiza(taxa){
        this._saldo += taxa;
    }

}

class ContaPoupanca extends Conta2{
    
    atualiza(taxa){
        this._saldo += (taxa*2);
    }
}

conta1 = new ContaCorrente(200.0); 
conta2 = new ContaPoupanca(300.0); 
conta3 = new ContaCorrente();

conta1.atualiza(2);
conta2.atualiza(3);
conta3.atualiza(4);

console.log(conta1.saldo); //202
console.log(conta2.saldo); //306
console.log(conta3.saldo); //4