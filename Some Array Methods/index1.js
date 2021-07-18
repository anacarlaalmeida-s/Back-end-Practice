const numeros = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
const frutas = ["Banana", "Amora", "abacaxi", "uva", "Pera"];

//a - crescente
numeros.sort((a,b) => a-b);

//b - decrescente
numeros.sort((a,b) => b-a);

//c - unicode
numeros.sort()

//d - crescente alfabeticamente
frutas.sort((a,b) => a.localeCompare(b));

//e - decrescente alfabeticamente
console.log(frutas.sort((a,b) => -a.localeCompare(b)));

//f - crescente por qt de caracter
frutas.sort((a,b) => {
    if (a.length < b.length){
        return -1;
    } else if(a.length > b.length) {
        return 1;
    }else{
        return 0;
    }
});


