const numeros = [1, 98, -76, 0, 12, 19, 5, 60, 44];

/*const maior = numeros.reduce((acc,item) =>{
    if (acc>item){
        return acc
    }else{
        return item
    }
});*/

//refatorado
const maior = numeros.reduce((acc,item) => acc>item ? acc : item);
console.log(maior)

