class Codigo{

    constructor(texto){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    get validaCodigo(){
        let expressaoReg = /\D{3}-\D{2}-\d{2}/;

        if(expressaoReg.test(this._texto)){
            return true; 
        }else{
            return false; 
        }
    }

}

// Testando Expressões Regulares - Cap. 04
let cod1 = new Codigo('A2C-KK-12');

if(cod1.validaCodigo){
    console.log('Código Válido!');
}else{
    console.log('Código Inválido!'); 
}    

/*
//   SOLUÇÃO PROFESSOR

class Codigo {

    constructor(texto) {

        if(!this._valida(texto)) throw new Error(`O texto ${texto} não é um código válido`);
        this._texto = texto;        
    }

    _valida(texto) {

        return /\D{3}-\D{2}-\d{2}/.test(texto);
    }

    get texto() {

        return this._texto;
    }
}

let codigo1 = new Codigo('GWZ-JJ-12'); // válido
console.log(codigo1.texto);
let codigo2 = new Codigo('1X1-JJ-12'); // inválido
console.log(codigo2.texto);

*/
