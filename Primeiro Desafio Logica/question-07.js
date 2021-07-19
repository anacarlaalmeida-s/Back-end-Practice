function solucao(texto) {
    // Seu codigo aqui
    const array = (texto.trim().split(" "));
    let novoArray = [];
    let espacos = [];

    for (let item of array) {
        if (item === "") {
            espacos.push(item)
        } else {
            novoArray.push(item)
        }
    }
    console.log(novoArray.length)
}

//resolução
const array = (texto.trim().split(" "));
let qtdPalavras = 0;
for (let item of array) {
    if (item !== "") {
        qtdPalavras++;
    }
    console.log(qtdPalavras);
}


