class MensagemView extends View{

    constructor(elemento){ // Opcional
        super(elemento);
    }
    // Essa chamada a Classe Pai só é necessária se a quantidade
    // de parâmetros for diferente do construtor do Pai
    /*
    Por exemplo: 
        constructor(elemento, posicaoTela){
            super(elemento); //deve ser a 1ª instrução
            this._posicaoTela = posicaoTela;
        }
    */

    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }

    
}