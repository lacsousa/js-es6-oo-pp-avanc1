class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        // Forma de implementar um micro Framework
        // Como no jQuery
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        // a estratégia de mudar de let ( variáveis) para o this
        // reduz o acesso ao DOM a apenas 1 vez, mesmo que ocorram 
        // 5000 negociações
    }

    adiciona(event){
        event.preventDefault();
        console.log('Passei no Controller de Negociação');

      
      
        // console.log(this._inputData.value);
        // console.log(this._inputQuantidade.value);
        // console.log(this._inputValor.value);

        // Problema com datas
        //Vamos usar o Spread ( ... ) ( oeprador ES6 que separa os parâmetros do construtor)
        let data = new Date(... this._inputData.value.
            split('-')
            // Arrow function 
            // Vc retira o function e se vc só tiver 1 linha no bloco
            // vc pode reduzir mais ainda 
            .map((item, indice) => item - indice % 2 ));
        // Tudo isso. porque o mês nesse Date
        // inicia com 0 ( Janeiro )
        console.log(data);

        let negociacao = new Negociacao(data,
            this._inputQuantidade.value, this._inputValor.value);
        console.log(negociacao);
    }

    /*
        .map( (item, indice) function {
            return item - indice % 2;
        }));
    */
}