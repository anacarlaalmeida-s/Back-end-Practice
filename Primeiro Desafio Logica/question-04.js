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

