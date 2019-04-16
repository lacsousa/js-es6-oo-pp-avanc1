class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {
             //    alert('Importando negociações');
            //Não estamos usando jQuery, usaremos JS Puro
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            // Configurações
            xhr.onreadystatechange = () => {
                 // Precisa testar o status 200 
                // Porque um erro é uma resposta válida
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        // JSON.parse - converte Texto num Objeto JS  
                        // Para cada objeto converte para um instancia de negociacao
                        // No novo array ( map ) vc percorre e adiciona 
                        resolve(JSON.parse(xhr.responseText));

                          // O Service não deve ter contato com a View
                        // this._mensagem.texto = 'Negociações importadas da semana'; 
                    }else{
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
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


    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }
}