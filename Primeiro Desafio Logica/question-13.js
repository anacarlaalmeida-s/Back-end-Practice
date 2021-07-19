function processData(input) {
    const inputArray = input.trim().split("\n");//tratamento entrada até linha 19
    const n = inputArray[0];

    const coordenadas = [];
    for (let i = 1; i < inputArray.length; i++) {
        const coord = inputArray[i].split(" ");
        coordenadas.push({
            x: parseFloat(coord[0]),//poderia usar 'Number'
            y: parseFloat(coord[1]),
        })
    }

    let maiorDistancia = 0;//início do cálculo
    for (let i = 0; i < coordenadas.length; i++) {
        for (let j = 0; j < coordenadas.length; j++) {
            if ((Math.sqrt(Math.pow(coordenadas[j].x - coordenadas[i].x, 2) + Math.pow(coordenadas[j].y - coordenadas[i].y, 2))) > maiorDistancia) {
                maiorDistancia = Math.sqrt(Math.pow(coordenadas[j].x - coordenadas[i].x, 2) + Math.pow(coordenadas[j].y - coordenadas[i].y, 2));
            }
        }
    }
    console.log(maiorDistancia)
}


//resolução de início do cálculo
let maiorDistancia = 0;
for (let c1 of coordenadas) {
    for (let c2 of coordenadas) {
        const distancia = Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
        if (distancia > maior) {
            maior = distancia;
        }
    }
}
console.log(maior)



