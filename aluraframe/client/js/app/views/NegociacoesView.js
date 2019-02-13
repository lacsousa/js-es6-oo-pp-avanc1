class NegociacoesView { 

    constructor(elemento){
        this._elemento = elemento;
    }

    _template(model) { 
        // Se o retorno não fosse uma template string, não poderíamos "identar" 
        // o código desta forma
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${model.negociacoes.map(n => {
                        // console.log(n);
                        // return n;
                        return `
                            <tr>
                                <td>${DateHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>
                        `
                    }).join('')}
                </tbody>

                <tfoot>
                    <td colspan="3"></td>
                    <td>${
                        (function() {
                
                            let total = 0;
                            model.negociacoes.forEach(n => total+= n.volume);
                            return total;
                            // Immediately-invoked function expression (IIFE)
                            // A função imediata. Recurso usado na criação de escopo em JavaScript
                            // Coloca um bloco na expressão, sendo executado imediatamente.
                       })()
                    }
                    </td>
                </tfoot>
            </table>`;
    }

    _update(model){
        this._elemento.innerHTML = this._template(model);
    }
}