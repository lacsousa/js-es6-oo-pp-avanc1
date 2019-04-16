class NegociacaoController {

    constructor() {

        this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas

        let $ = document.querySelector.bind(document);
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

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        // primeira update
        // Retirado no Cap. 3.3. ----->   this._negociacoesView.update(this._listaNegociacoes);
        // a estratégia de mudar de let ( variáveis) para o this
        // reduz o acesso ao DOM a apenas 1 vez, mesmo que ocorram 
        // 5000 negociações  

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event) {
        event.preventDefault();

        //let data = DateHelper.textoParaData(this._inputData.value);

        /*
        split('-')
            // Arrow function 
            // Vc retira o function e se vc só tiver 1 linha no bloco
            // vc pode reduzir mais ainda 
            .map((item, indice) => item - indice % 2 ));
        // Tudo isso. porque o mês nesse Date
        // inicia com 0 ( Janeiro )
        console.log(data);
*/
        // let negociacao = new Negociacao(data,
        // this._inputQuantidade.value, this._inputValor.value);

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        // Cap.04.06 
        // this._listaNegociacoes.negociacoes.length = 0;
        // this._listaNegociacoes.negociacoes.push(this._criaNegociacao);

        // Depois de criada a armadilha vamos comentar o update aqui
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociação adiconada com sucesso!";
        this._limpaFormulario();
        // console.log(this._listaNegociacoes.negociacoes);
        // console.log(DateHelper.dataParaTexto(negociacao.data));
    }
    /*
        .map( (item, indice) function {
            return item - indice % 2;
        }));
    */

    importaNegociacoes() {
        // Trabalhando com o Promise
        let service = new NegociacaoService();

        service.obterNegociacoes()
        .then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';    
            console.log(negociacoes);
        }).catch(erro => this._mensagem.texto = erro);

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

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        //    this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = 'Lista de negociações foi removida com sucesso!';
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }
}