//Numa mesa de poker existe um valor mínimo de dinheiro que você precisa ter para poder jogar, há também um limite máximo
//Faça um programa que selecione dentre um lista de valores, apenas aqueles que são permitidos para se jogar numa determiada mesa de poker.
//A entrada é costituida de 3 variáveis: min é o mínimo necessário para se poder jogar nesta mesa. É necessário ter o mínimo ou mais.
//max é o máximo permitido para se poder jogar nesta mesa. É necessário ter o máximo, ou menos.
//valores é um array que contém os valores com os quais o jogadores estão tentando sentar na mesa para jogar
//Imprima na tela a lista contendo apeas os valores que são autorizados a jogar nessa mesa, mantendo a mesma ordem da entrada.

function solucao(min, max, valores) {
    let permitidos = [];
    for (let item of valores) {
        if (item >= min && item <= max) {
            permitidos.push(item);
        }
    } console.log(permitidos);
}


//resolução

const podemJogar = [];
for (let item of valores) {
    if (item >= min && item <= max) {
        podemJogar.push(item);
    }
    console.log(podemJogar)
}

