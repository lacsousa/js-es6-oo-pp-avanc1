'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas

                    var $ = document.querySelector.bind(document);
                    // Forma de implementar um micro Framework
                    // Como no jQuery
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    /* Começar a trabalhar com o Proxy
                    this._listaNegociacoes = new ListaNegociacoes(model => {
                        console.log(this); // Quando trocamos o function pelo arrow function (AF)=>
                                            // Ele mantém o this. Pq numa AF o o escopo de this 
                                            // é léxico, em vez de ser dinâmico como a outra função
                        this._negociacoesView.update(model);
                    });   */

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    // primeiro update
                    // Retirado no Cap. 3.3. ----->   this._negociacoesView.update(this._listaNegociacoes);
                    // a estratégia de mudar de let ( variáveis) para o this
                    // reduz o acesso ao DOM a apenas 1 vez, mesmo que ocorram 
                    // 5000 negociações  

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

                    this._service = new NegociacaoService();
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 4000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        new NegociacaoService().cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        // Trabalhando com o Promise
                        this._service.importa(this._listaNegociacoes.negociacoes)
                        //Se vc tivesse colocado um Bloco { } vc teria que explicitar um "return" 
                        // para os dados irem para o bloco abaixo
                        .then(function (negociacoes) {
                            negociacoes
                            // .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                            .forEach(function (negociacao) {
                                return _this3._listaNegociacoes.adiciona(negociacao);
                            });
                            _this3._mensagem.texto = 'Negociações importadas com sucesso';
                            console.log(negociacoes);
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });

                        /* 2a. REFATORAÇÃO acima
                        service.obterNegociacoesDaSemana()
                            .then(negociacoes => {
                                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                                this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
                            })
                            .catch(erro => this._mensagem.texto = erro);
                          service.obterNegociacoesDaSemanaAnterior()
                            .then(negociacoes => {
                                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                                this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
                            })
                            .catch(erro => this._mensagem.texto = erro);
                          service.obterNegociacoesDaSemanaRetrasada()
                            .then(negociacoes => {
                                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                                this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
                            })
                            .catch(erro => this._mensagem.texto = erro);
                        */

                        /* 
                        //Error-First-Callback
                        service.obterNegociacoesDaSemana((erro, negociacoes) => {
                            if(erro){
                                this._mensagem.texto = erro;
                                return;
                            }
                            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                              service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                                if(erro){
                                    this._mensagem.texto = erro;
                                    return;
                                }
                                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                                  service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                                    if(erro){
                                        this._mensagem.texto = erro;
                                        return;
                                    }
                                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                                    this._mensagem.texto = 'Negociações Semana importadas com sucesso!';
                                });
                            });
                        });
                        */
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this4._listaNegociacoes.esvazia();
                            //    this._negociacoesView.update(this._listaNegociacoes);
                            _this4._mensagem.texto = mensagem;
                        });
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map