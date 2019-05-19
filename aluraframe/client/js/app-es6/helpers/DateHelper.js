export class DateHelper {

    constructor(){
        throw new Error('A Classe DateHelper não pode ser instanciada!');
    }

    // Template Sring usa o (backstick, em inglês) ( crase)` 
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        //Expressão regular para causar o Fail Fast
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error('Deve estar no formato aaaa-mm-dd');
        }
        return new Date(...texto.split('-')
            .map((item, indice) => item - indice % 2));
    }
}