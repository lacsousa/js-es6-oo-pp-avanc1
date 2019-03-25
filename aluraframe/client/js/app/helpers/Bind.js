class Bind{

    constructor(model, view, props){
        let proxy = ProxyFactory.create(model, props, model => {
            view.update(model);
        });

        view.update(model);
        // Em JS um construtor pode retornar algo diferente do que 
        // uma referência para a Classe
        return proxy;
    }
}