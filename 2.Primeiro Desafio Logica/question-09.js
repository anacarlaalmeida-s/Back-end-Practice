function solucao(precos) {
    const soma = precos.reduce((acc, item) => item + acc);
    const descontoMenorValor = precos.reduce((acc, item) => item < acc ? item : acc) / 2;

    if (precos.length >= 3) {
        console.log(soma - descontoMenorValor);
    } else {
        console.log(soma)
    }
}

//resolução
let soma = 0;
let menor = precos[0];
for (let item of precos) {
    soma += item;
    if (item < menor) {
        menor = item;
    }
}
if (precos.length < 3) {
    console.log(soma);
} else {
    const desconto = menor / 2;
    console.log(soma - desconto);
}
