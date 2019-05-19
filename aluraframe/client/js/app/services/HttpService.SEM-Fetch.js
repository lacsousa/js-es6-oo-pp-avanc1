"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: "get",
                    value: function get(url) {

                        return new Promise(function (resolve, reject) {
                            //    alert('Importando negociações');
                            //Não estamos usando jQuery, usaremos JS Puro
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url);

                            // Configurações
                            xhr.onreadystatechange = function () {
                                // Precisa testar o status 200 
                                // Porque um erro é uma resposta válida
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        // JSON.parse - converte Texto num Objeto JS  
                                        // Para cada objeto converte para um instancia de negociacao
                                        // No novo array ( map ) vc percorre e adiciona 
                                        resolve(JSON.parse(xhr.responseText));

                                        // O Service não deve ter contato com a View
                                        // this._mensagem.texto = 'Negociações importadas da semana'; 
                                    } else {
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
                }, {
                    key: "post",
                    value: function post(url, dado) {

                        return new Promise(function (resolve, reject) {

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = function () {

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
                }]);

                return HttpService;
            }();
        }
    };
});
//# sourceMappingURL=HttpService.SEM-Fetch.js.map