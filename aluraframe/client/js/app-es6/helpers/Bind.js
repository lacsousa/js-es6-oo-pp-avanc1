import {ProxyFactory} from '../services/ProxyFactory';

export class Bind{

    // ... Dessa forma é o REST Operator e não o Spread
    constructor(model, view, ...props){

        let proxy = ProxyFactory.create(model, props, model => {
            view.update(model);
        });

        view.update(model);
        // Em JS um construtor pode retornar algo diferente do que 
        // uma referência para a Classe
        return proxy;
    }
}