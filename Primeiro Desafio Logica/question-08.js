//Num jogo de futebol entre amigos é muito comum que ninguém queira ser o goleiro. Para resolver esse impasse, um time decidiu utilizar o jogo "Americano"
//vamos considerar que o capitão está na posição 1, o jogador a sua direita está na posição 2, o jogador a direita deste está na posição 3, e assim por diante.
//Você deve fazer um programa que determina qual a posição do jogador que deve ser o goleiro.
//A entrada será um array com N números, que corresempondem ao número jogado por cada um dos jogadores do time.


function solucao(numeros) {
    const soma = (numeros.reduce((acc, item) => acc + item));

    if (soma % numeros.length === 0) {
        console.log(numeros.length)
    } else {
        console.log(soma % numeros.length)
    }
}

//resolução

let soma = 0;
for (let item of numeros) {
    soma = soma + item;
}

const resto = soma % numeros.length;
if (resto === 0) {
    console.log(numeros.length)
} else {
    console.log(resto)
}

