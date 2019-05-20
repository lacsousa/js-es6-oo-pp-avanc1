import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                console.log('Negociação incluída com sucesso');
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível incluir a negociação');
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction(['negociacoes'], 'readwrite')
                .objectStore('negociacoes')
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result; // aponta para o 1o. objeto

                if (atual) {
                    let dado = atual.value;
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

            cursor.onerror = e => {
                console.log('Error:' + e.target.error.name);
                reject('Não foi possível listar todas as negociações!');
            };
        });
    }

    apagaTodos(){
        return new Promise((resolve, reject)=> {
            let request = this._connection
                .transaction(['negociacoes'], 'readwrite')
                .objectStore('negociacoes')
                .clear();
            
                request.onsuccess = e => resolve('Negociações removidas com sucesso!');
                
                request.onerror = e => {
                    console.log(e.target.error);
                    reject('Não foi possível remover as negociações');
                };

        });
    }
}