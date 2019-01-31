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

maiorNumero(numeros);

console.log(maiorP);

let data1 = new Date(['2016', '11', '12']);
let data2 = new Date();
console.log(data1);
console.log(data2);


