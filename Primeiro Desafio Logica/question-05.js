//O jogo de truco é muito popular pelo Brasil. Numa de suas versões, ele é jogado apenas com as cartas Q J K A 2 3. 
// Elas tem essa ordem de "força" nesse jogo, sendo 3 a mais valiosa e Q a menos valiosa. Contudo, a cada partida é virada uma carta com a face pra cima na mesa...
//A entrada é um string armazenado na variável cartaParaCima que indica qual carta ficou virada para cima. Será sempre uma das opções: Q, J, K, A, 2, 3.
//Imprima na tela qual é a manilha desta partida. Sua resposta deve ser sempre uma das opções: Q, J, K, A, 2, 3.

function solucao(carta) {
    //seu codigo aqui
    if (carta === "Q") {
        console.log("J");
    } else if (carta === "J") {
        console.log("K");
    } else if (carta === "K") {
        console.log("A");
    } else if (carta === "A") {
        console.log("2");
    } else if (carta === "2") {
        console.log("3");
    } else {
        console.log("Q");
    }
}