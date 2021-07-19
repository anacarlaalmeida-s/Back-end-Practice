//Quando precisa-se escolher apenas uma pessoa aleatoriamente dentro de um grupo, é comum jogar "zerinho ou um"
//Aquele que for o único(a) a jogar zero ou um é o sorteado. 
//Faça um programa que imprima o nome da pessoa que foi sorteada, ou NINGUEM, caso ninguém tenha sido sorteado(a).
//A entrada será sempre um vetor de objetos chamado jogadores, em que cada objeto é uma pessoa...
//Imprima na tela o nome do jogador que foi sorteado.

function solucao(jogadores) {
    let soma = 0;
    jogadores.forEach((x, i) => soma += jogadores[i].jogada)

    for (let item of jogadores) {
        if (soma === 1 && item.jogada === 1 || soma === jogadores.length - 1 && item.jogada === 0) {
            console.log(item.nome);
            break
        } else if (soma === 0 || soma === jogadores.length || soma > 1 && soma < jogadores.length - 1) {
            console.log("NINGUEM");
            break;
        }
    }
}

//resolução

const listaZero = [];
const listaUm = [];

for (let item of jogadores) {
    if (item.jogada === 0) {
        listaZero.push(item)
    } else {
        listaUm.push(item)
    }
}
if (listaZero.length === 1) {
    console.log(listaZero[0].nome);
} else if (listaUm.length === 1) {
    console.log(listaUm[0].nome)
} else {
    console.log("NINGUEM")
}
