class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterNegociacoesDaSemana() {

        // Outra forma de implementação
        // Sem criar uma nova Promise, já que HttpService já cria uma e repassa para NegociacaoService
        // return new Promise((resolve, reject) => {
            return this._httpService
                .get('negociacoes/semana')
                .then(negociacoes => { 
                    // resolve(negociacoes
                            // .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    console.log(negociacoes);
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch( erro => {
                    console.log(erro);
                    // reject('Não foi possível obter as Negociações da semana');
                    throw new Error('Não foi possível obter as Negociações da semana');
                });
        // });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {

            this._httpService
                .get('negociacoes/anterior')
                .then(negociacoes => { 
                    resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject('Não foi possível obter as Negociações da semana anterior');
                });
        });
    }
    
    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {

            this._httpService
                .get('negociacoes/retrasada')
                .then(negociacoes => { 
                    resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject('Não foi possível obter as Negociações da semana retrasada');
                });
        });
    }


    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    } 
}