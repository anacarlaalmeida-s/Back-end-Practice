//...realocar as mesas da sala para que as pessoas precisem andar o mínimo possível. 
//...determinar qual é a maior distância que precisa ser andada para uma pessoa chegar na mesa do colega. 
//...o número de pessoas está ficando bem grande.
//Considere que cada pessoa é um ponto no plano euclidiano e que a distância é sempre uma linha reta entre dois pontos.
//Neste problema a entranda é um único string que você deve tratar adequadamente para obter as informações que você precisa em variáveis separadas.
//A primeira linha deste string será o inteiro N que indica o número de funcionários da Cubos. Nas próximas N linhas você lerá dois números, as coordenadas X e Y do i-ésimo funcionário.

function processData(input) {
    const inputArray = input.trim().split("\n");//tratamento entrada até linha 19
    const n = inputArray[0];

    const coordenadas = [];
    for (let i = 1; i < inputArray.length; i++) {
        const coord = inputArray[i].split(" ");
        coordenadas.push({
            x: parseFloat(coord[0]),
            y: parseFloat(coord[1])
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
