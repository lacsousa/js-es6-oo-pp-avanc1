class Funcionario{

    constructor(email){
        this._email = email;
    }

    get email(){
        return this._email;
    }

    set email(email){
        this._email = email;
    }

    fala(frase) {
        return `${this._email} fala ${frase}`;
    }
}
//---------------------------------------------------------------
let func = new Proxy( new Funcionario('lacsousa@gmail.com'), {

    get: function (target, prop, receiver) {
        
        console.log(`Armadilha aqui na propriedade "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
});

//---------------------------------------------------------------
let funcProxy = new Proxy(new Funcionario('lacsousa@gmail.com'), {
    set: function (target, prop, value, receiver) {
        console.log(`Valor anterior: ${target[prop]}, novo valor: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
});

console.log(func.email);

funcProxy.email = 'teste@tgmail.com';

//---------------------------------------------------------------
let func2 = new Proxy( new Funcionario('lacsousa@gmail.com'), {

    get: function (target, prop, receiver) {
        if(prop == 'fala' && typeof(target[prop]) == typeof(Function)){
            // essa função retornada irá substituir o método 'fala' no proxy!!! 
            // Ou seja, estamos usando o handler do proxy para modificar o próprio proxy, que loucura!
            return function() {
                console.log(`Método chamado: ${prop}`); 
                return Reflect.apply(target[prop], target, arguments);     
                // Quando usarmos Reflect.apply, Reflect.get e Reflect.set precisamos retornar o resultado da operação
                // com return
                // arguments é uma variável implícita que dá acesso à todos os parâmetros recebidos pelo método/função
            }
        }    
        // só executa se não for função 
        return Reflect.get(target[prop], target, arguments);  
        }
    
});


console.log(func2.fala(' Olá !'));

