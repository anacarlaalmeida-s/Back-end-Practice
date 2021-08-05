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


//resolução

let menorDentreMaiores;
for (let item of lista) {
    if (item >= 18) {
        if (menorDentreMaiores === undefined) {
            menorDentreMaiores = item;
        } else if (item < menorDentreMaiores) {
            menorDentreMaiores = item;
        }
    }
    if (menorDentreMaiores === undefined) {
        console.log("CRESCA E APARECA")
    } else {
        console.log(menorDentreMaiores)
    }
}





