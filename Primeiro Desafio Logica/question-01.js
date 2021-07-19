function solucao(lista) {
    const soma = lista.reduce((acc, item) => {
        return acc + item;
    })
    console.log(soma)
}

//resolução
let soma = 0;

for (let item of lista) {
    soma += item;
}
console.log(soma)
