//...o cliente que comprasse pelo menos 3 itens, teria um desconto de 50% no item mais barato.
//A entrada será sempre um vetor de inteiros positivos. Cada inteiro desse representa o valor de cada produto comprado por um dado cliente, em centavos.
//Imprima o valor a ser pago pelo cliente...Imprima este valor também em centavos.

function solucao(precos) {
    const soma = precos.reduce((acc, item) => item + acc);
    const descontoMenorValor = precos.reduce((acc, item) => item < acc ? item : acc) / 2;

    if (precos.length >= 3) {
        console.log(soma - descontoMenorValor);
    } else {
        console.log(soma)
    }
}
