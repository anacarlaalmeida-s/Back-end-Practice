//...UMA PALAVRA FOI ESCRITA COM cAPS lOCK SE OU TODAS AS SUAS LETRAS FOREM MAIÚSCULAS OU SE A PRIMEIRA FOR MINÚSCULA E TODAS AS OUTRAS MAIÚSCULAS. a CORREÇÃO NESSES CASOS É INVERTER TODAS AS LETRAS.
//a ENTRADA CONSISTE DE UMA ÚNICA PALAVRA CONTENDO APENAS LETRAS LATINAS (A-Z), MINÚSCULAS OU MAIÚSCULAS.
//iMPRIMA A PALAVRA CORRIGIDA, CASO O ALGORITMO TENHA DETECTADO QUE ELA FOI ESCRITA COM cAPS lOCK ATIVO.

function processData(input) {
    const inputTotalCaps = input.toUpperCase();
    const inputSomeCaps = (`${input.substr(0, 1).toLowerCase()}${input.substr(1).toUpperCase()}`);

    if (input === inputSomeCaps) {
        console.log(`${input.substr(0, 1).toUpperCase()}${input.substr(1).toLowerCase()}`);
    } else if (input === inputTotalCaps) {
        console.log(input.toLowerCase())
    } else {
        console.log(input);
    }
}

//resolução

if (input === input.toUpperCase() ||
    (input[0] === input[0].toLowerCase() && input.substr(1) === input.substr(1).toUpperCase()) {
    let resultado = "";
    for (let letra of input) {
        if (letra === letra.toUpperCase()) {
            resultado += letra.toLowerCase();
        } else {
            resultado += letra.toUpperCase();
        }
    }
    console.log(resultado);
} else {
    console.log(input);
}