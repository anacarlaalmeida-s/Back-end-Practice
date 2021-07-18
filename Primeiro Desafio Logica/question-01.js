//Álvaro está economizando para comprar uma uma passagem para a europa. Por isso diariamente ele coloca um valor no cofre. 
//Faça um programa que calcule o total acumulado no cofre até o momento.

function solucao(lista) {
    const soma = lista.reduce((acc, item) => {
        return acc + item;
    })
    console.log(soma)
}