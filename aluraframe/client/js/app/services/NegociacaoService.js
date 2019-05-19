'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _ConnectionFactory = require('./ConnectionFactory');

var _NegociacaoDao = require('../dao/NegociacaoDao');

var _Negociacao = require('../models/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._httpService = new _HttpService.HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {

            // Outra forma de implementação
            // Sem criar uma nova Promise, já que HttpService já cria uma e repassa para NegociacaoService
            // return new Promise((resolve, reject) => {
            return this._httpService.get('negociacoes/semana').then(function (negociacoes) {
                // resolve(negociacoes
                // .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                console.log(negociacoes);
                return negociacoes.map(function (objeto) {
                    return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                // reject('Não foi possível obter as Negociações da semana');
                throw new Error('Não foi possível obter as Negociações da semana');
            });
            // });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _this._httpService.get('negociacoes/anterior').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as Negociações da semana anterior');
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _this2._httpService.get('negociacoes/retrasada').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as Negociações da semana retrasada');
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []);

                return negociacoes;
            }).catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (conexao) {
                return new _NegociacaoDao.NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return "Negociação adiconada com sucesso!";
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível adicionar a negociação!");
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (conexao) {
                return new _NegociacaoDao.NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível listar todas as negociações!');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (conexao) {
                return new _NegociacaoDao.NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagadas com sucesso!';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações!');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            // Trabalhando com o Promise
            return this.obterNegociacoes()
            //filter - filtra o resultado do que será disponibilizado depois
            // critério para um Array
            .then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível buscar as negociações!');
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map