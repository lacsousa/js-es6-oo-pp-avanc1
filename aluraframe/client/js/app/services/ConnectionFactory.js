var ConnectionFactory = (function () {
// Essa conversão da Classe numa Função Anônima e retornando variáveis 
// e um Classe é um Padrão de Projeto chamado Module
// A variável ConnectionFactory tem um escopo global, mas o restante não

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;

    var close = null; 

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    //0, "", null, undefined .. tudo isso é Falso
                    if (!connection) {
                        connection = e.target.result;

                        // Monkey Patch
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            //criando novas stores
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, {
                    autoIncrement: true
                });
            });

        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }
    }
}) (); // Função AutoInvocada