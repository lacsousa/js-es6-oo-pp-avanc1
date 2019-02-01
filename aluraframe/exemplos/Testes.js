const numeros = [0, 500, 1, -1, 0, 4000, 50];
let maiorP = 0;

//console.log(numeros.length);

maiorNumero = function () {
    for (var i = 0; i < numeros.length; i++) {

        //console.log('numeros[i]', numeros[i]);

        if (maiorP < numeros[i]) {
            maiorP = numeros[i];
        }
    }
}

// maiorNumero(numeros);

// console.log(maiorP);

let data1 = new Date(['2016', '11', '12']);
let data2 = new Date();
// console.log(data1);
// console.log(data2);

//---------------------------------------------------------------------
let numeros1 = [3,2,11,20,8,7];

let numeros2 = numeros1.map(item => item%2 !=0 ? item*2 : item) ;

console.log(numeros1);
console.log(numeros2);

// Maneira Não funcional do mesmo algoritmo

let numeros3 = [3,2,11,20,8,7];
let novosNumeros = [];

numeros3.forEach(item => {

    if(item % 2  != 0) {
        novosNumeros.push(item * 2);
    } else {
        novosNumeros.push(item);
    }
});
console.log(novosNumeros);
//---------------------------------------------------------------------

//----------  UTILIZE O Spread //#endregion

function somaDoisNumeros(numero1, numero2) {
    return numero1 + numero2;                                            
}
let num = [10,30];
console.log(somaDoisNumeros(num[0], num[1]));
console.log(somaDoisNumeros(...num));
