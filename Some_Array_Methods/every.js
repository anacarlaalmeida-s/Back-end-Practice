const numeros = [0, 122, 4, 6, 7, 8, 44];


function filtroPares (array){
    const validador = array.every(x => x%2===0);

    if (validador){
        console.log("Array válido")
    }else{
        console.log("Array inválido")
    }
};
filtroPares(numeros)





