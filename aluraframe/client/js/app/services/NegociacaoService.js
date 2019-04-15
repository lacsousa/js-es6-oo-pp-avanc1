class NegociacaoService {

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            //    alert('Importando negociações');
            //Não estamos usando jQuery, usaremos JS Puro
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');

            // Configurações
            xhr.onreadystatechange = () => {
                // Precisa testar o status 200 
                // Porque um erro é uma resposta válida
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log('Obtendo as negociações do Servidor.');
                        // JSON.parse - converte Texto num Objeto JS  
                        // Para cada objeto converte para um instancia de negociacao
                        // No novo array ( map ) vc percorre e adiciona 
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                        // O Service não deve ter contato com a View
                        // this._mensagem.texto = 'Negociações importadas da semana';    
                    } else {
                        // this._mensagem.texto = 'Não foi possível obter as negociações do Servidor.';
                        console.log('Não foi possível obter as negociações do Servidor.');
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações');
                    }
                }
            };

            xhr.send();

            /* Estados Possíveis de uma requisição AJAX
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição está concluída e a resposta está pronta
            */
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações da Semana anterior');
                    }
                }
            };
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as Negociações da Semana Retrasada');
                    }
                }
            };
            xhr.send();
        });
    }
}