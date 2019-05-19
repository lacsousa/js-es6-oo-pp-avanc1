import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

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
            .catch(erro => {
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
                .catch(erro => {
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
                .catch(erro => {
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
            console.log(erro);
            throw new Error(erro);
        });

    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adiconada com sucesso!")
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível adicionar a negociação!");
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível listar todas as negociações!');
            });
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso!')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações!');
            });
    }

    importa(listaAtual) {
        // Trabalhando com o Promise
        return this.obterNegociacoes()
            //filter - filtra o resultado do que será disponibilizado depois
            // critério para um Array
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar as negociações!');
            });
    }
}