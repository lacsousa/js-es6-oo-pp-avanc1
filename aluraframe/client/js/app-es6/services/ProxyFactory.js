class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get: function (target, prop, receiver) {

                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                    // trocar o meu método do Proxy por outro método
                    return function () {
                        // Tem que ser function para ter o this dinâmico. 
                        //Não pode ser arrow function que possui escopo léxico.
                        console.log(`a propriedade "${prop}" foi interceptada`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    };
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)){
                    // target[prop] = value;
                    acao(target);
                }
                
                return retorno;
            }
        });
    }

    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);
    }
}