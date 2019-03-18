class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get: function (target, prop, receiver) {

                if (props.includes(prop) && typeof (target[prop] == typeof (Function))) {

                    // trocar o meu método do Proxy por outro método
                    return function () {
                        // Tem que ser function para ter o this dinâmico. 
                        //Não pode ser arrow function que possui escopo léxico.
                        console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                if(props.includes(prop)){
                    target[prop] = value;
                    acao(target);
                }
                
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
}