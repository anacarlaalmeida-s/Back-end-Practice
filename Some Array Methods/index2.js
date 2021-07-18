const cidades = ['Salvador', 'São Paulo', 'Brasilia', 'Recife', 'Rio de Janeiro'];

const maisCaracter = cidades.reduce((acc, item) => {
    if (acc.length>item.length){
        return acc
    }else{
        return item
    }
});
console.log(maisCaracter)

