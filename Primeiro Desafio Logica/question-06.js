//Um determinado evento é permitido apenas para maiores de idade. 
//Seu objetivo é fazer um programa que determine qual a idade da pessoa mais nova, dentre os que podem participar (maiores de idade).
//A entrada é um array com as idades das pessoas que tentam participar.
//Imprima na tela a idade da pessoa mais jovem que pode participar. Se ninguém puder participar, imprima na tela a mensagem CRESCA E APARECA.


function solucao(lista) {
    const validador = lista.every(x => x < 18);
    if (validador) {
        console.log("CRESCA E APARECA")
    } else {
        const listaFiltrada = lista.filter(x => x >= 18);
        const menorIdade = listaFiltrada.reduce((acc, item) => item < acc ? item : acc);
        console.log(menorIdade);
    }
}

