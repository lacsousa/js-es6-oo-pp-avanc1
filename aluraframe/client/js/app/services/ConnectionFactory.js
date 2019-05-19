'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Agora não precisa de var Connection
// POrque agora será um Módulo JS


// var ConnectionFactory = (function () {
// Essa conversão da Classe numa Função Anônima e retornando variáveis 
// e um Classe é um Padrão de Projeto chamado Module
// A variável ConnectionFactory tem um escopo global, mas o restante não

var stores = ['negociacoes'];
var version = 4;
var dbName = 'aluraframe';

var connection = null;
var close = null;

// return class ConnectionFactory {

var ConnectionFactory = exports.ConnectionFactory = function () {
    function ConnectionFactory() {
        _classCallCheck(this, ConnectionFactory);

        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    _createClass(ConnectionFactory, null, [{
        key: 'getConnection',
        value: function getConnection() {

            return new Promise(function (resolve, reject) {

                var openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = function (e) {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = function (e) {
                    //0, "", null, undefined .. tudo isso é Falso
                    if (!connection) {
                        connection = e.target.result;

                        // Monkey Patch
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                    }
                    resolve(connection);
                };

                openRequest.onerror = function (e) {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }
    }, {
        key: '_createStores',
        value: function _createStores(connection) {
            //criando novas stores
            stores.forEach(function (store) {
                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                connection.createObjectStore(store, {
                    autoIncrement: true
                });
            });
        }
    }, {
        key: 'closeConnection',
        value: function closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }]);

    return ConnectionFactory;
}();

// }) (); // Função AutoInvocada
//# sourceMappingURL=ConnectionFactory.js.map