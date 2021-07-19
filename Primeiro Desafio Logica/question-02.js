function solucao(lista) {
    const media = lista.reduce((acc, item) => {
        return acc + item;
    })
    console.log(media / lista.length)
}


//resolução

let soma = 0;
for (let item of lista) {
    soma += item;
}
console.log(soma / lista.length);



