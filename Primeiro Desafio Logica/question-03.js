//...você crie um programa que consiga fazer a prova-real de todos os exercícios da professora Raissa.
//Seu objetivo é: Implementar uma função que receba três argumentos: numero, limiteInferior e limiteSuperior;
//Essa função deve retornar se esse número pertence ao conjunto que é limitado pelo limiteInferior e limiteSuperior
//A entrada consista de três parâmetros: numero, limiteInferior e limiteSuperior.
//Imprima uma das duas opções abaixo: PERTENCE - para quando um número pertence ao limite delimitado;
//NAO PERTENCE - para quando um número não pertence ao limite delimitado;


function solucao(numero, limiteInferior, limiteSuperior) {
    if (numero>=limiteInferior && numero<=limiteSuperior){
    console.log ('PERTENCE');
}else{
    console.log('NAO PERTENCE');
}

}