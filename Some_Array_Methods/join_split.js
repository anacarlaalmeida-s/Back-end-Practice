const palavras = ["arroz", "feijão", "carne", "cerveja", "macarrão"];

function validadorLista (lista){

    const listaEmMinusculo = lista.join(" ").split(" ");

    const verificador = listaEmMinusculo.some(x => x === "cerveja" || x === "vodka" );
   
    if (verificador){
        console.log("Revise sua lista, João! Possui bebida com venda proibida!");
    }else{
        console.log("Tudo certo, vamos as compras!");
    }   
};

validadorLista(palavras);



