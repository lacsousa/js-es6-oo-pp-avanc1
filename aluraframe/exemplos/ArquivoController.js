class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

   /* Primeira Versão sem o Helper
   envia() {
        let dados = this._inputDados.value.split('/')
            .map(item => item.toUpperCase());
        let arquivo = new Arquivo(...dados); // usando spread operator
        console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
        this._limpaFormulario();

    }
    */

    envia() {
        let arquivo = ArquivoHelper.cria(this._inputDados.value);
        console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
        this._limpaFormulario();
    }

    _limpaFormulario() {
        this._inputDados.value = '';
        this._inputDados.focus();
    }


}