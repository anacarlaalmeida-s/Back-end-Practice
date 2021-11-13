const palavras = ['livro', 'caneta', 'sol', 'carro', 'orelha'];


function validadorPalavra (lista){

    const contCarcacter = palavras.some(x => x.length>5);

    if (contCarcacter){
        console.log("existe palavra inválida")
    }else{
        console.log("array validado.")
    }
};

validadorPalavra(palavras)



