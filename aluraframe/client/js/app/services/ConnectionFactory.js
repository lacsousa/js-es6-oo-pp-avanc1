var stores = ['negociacoes'];
var version = 4;
var dbName = 'aluraframe';

class ConnectionFactory {

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
                resolve(e.target.result);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        //criando novas stores
        stores.forEach(strore => {
            if (e.target.result.objectStoreNames.contains(store))
                e.target.result.deleteObjectStore(store);

            e.target.result.createObjectStore(store, {
                autoIncrement: true
            });
        });

    }
}