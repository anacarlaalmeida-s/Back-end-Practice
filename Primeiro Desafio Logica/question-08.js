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

