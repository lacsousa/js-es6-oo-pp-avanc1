class Aluno {

    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
    }
}

class Prova {

    constructor(aluno, nota) {
        this.aluno = aluno;
        this.nota = nota;
    }
}

var avaliacoes = [
    new Prova(new Aluno(1, 'Luana'), 8),
    new Prova(new Aluno(2, 'Cássio'), 6),
    new Prova(new Aluno(3, 'Barney'), 9),
    new Prova(new Aluno(4, 'Bira'), 5)
];

var aprovados = avaliacoes
    .filter(function(prova) { return prova.nota >= 7; })
    .map(function(prova) { return prova.aluno.nome;});

console.log(aprovados);


var aprovados2Funcional = avaliacoes
    .filter((prova) => prova.nota >= 7)
    .map((prova) => prova.aluno.nome);

console.log(aprovados2Funcional);


//Quando a arrow function possui apenas um parâmetro, 
//podemos remover os parênteses. Vejamos como fica o código anterior:
var aprovados3Funcional = avaliacoes
    .filter(prova => prova.nota >= 7)
    .map(prova => prova.aluno.nome);
    console.log(aprovados3Funcional);    
