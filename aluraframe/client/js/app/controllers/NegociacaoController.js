class NegociacaoController {

    constructor(){
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
        });

        */

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        // primeira update
        this._negociacoesView.update(this._listaNegociacoes);
        // a estratégia de mudar de let ( variáveis) para o this
        // reduz o acesso ao DOM a apenas 1 vez, mesmo que ocorram 
        // 5000 negociações
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
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
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
        // console.log(this._listaNegociacoes.negociacoes);
        // console.log(DateHelper.dataParaTexto(negociacao.data));
    }
    /*
        .map( (item, indice) function {
            return item - indice % 2;
        }));
    */

   _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
   }

   _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value, 
            this._inputValor.value);
   }

   apaga(){
       this._listaNegociacoes.esvazia();
    //    this._negociacoesView.update(this._listaNegociacoes);
       this._mensagem.texto = 'Lista de negociações foi removida com sucesso!';
       this._mensagemView.update(this._mensagem);
   }
}