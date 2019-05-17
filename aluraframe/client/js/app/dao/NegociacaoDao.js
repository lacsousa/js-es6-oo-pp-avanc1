'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (e) {
                    console.log('Negociação incluída com sucesso');
                    resolve();
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível incluir a negociação');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (e) {
                    var atual = e.target.result; // aponta para o 1o. objeto

                    if (atual) {
                        var dado = atual.value;
                        // O dado é um JSon e precisa ser convertido numa negociação
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                        // o continue() chama novamente o cursor.onsuccess
                        atual.continue();
                    } else {
                        //Percorre topdas as negociações adicionando no array negociacoes
                        // e quando terminar ele entra no else
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (e) {
                    console.log('Error:' + e.target.error.name);
                    reject('Não foi possível listar todas as negociações!');
                };
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').clear();

                request.onsuccess = function (e) {
                    return resolve('Negociações removidas com sucesso!');
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível remover as negociações');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map