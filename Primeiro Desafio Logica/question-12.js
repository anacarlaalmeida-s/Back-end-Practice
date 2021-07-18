//O escritório é uma sala com mesas numeradas de 1 até N organizadas em uma única fileira. 
//Quando uma pessoa chega, ela rapidamente identifica uma mesa (vazia e que esteja o mais longe possível de outras mesas ocupadas) para se sentar
//Caso tenha mais de uma mesa igualmente boa, a pessoa escolhe a que fica mais próxima da porta, que fica ao lado da mesa 1.
//A entrada consistirá em um único número inteiro N.
function solucao(n) {
    if (n >= 3) {
        console.log(n - 1)
    } else if (n === 2) {
        console.log(n)
    } else if (n === 1) {
        console.log(1)
    }
}