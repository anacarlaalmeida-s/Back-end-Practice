const usuários = [
    {
        nome: "André",
        idade: 29,
        habilitado: false,
    },
    {
        nome: "Marcos",
        idade: 70,
        habilitado: true,
    },
    {
        nome: "Ana",
        idade: 35,
        habilitado: true,
    },
    {
        nome: "Vinícius",
        idade: 44,
        habilitado: true,
    },
    {
        nome: "Carlos",
        idade: 17,
        habilitado: false,
    },
    {
        nome: "Maria",
        idade: 19,
        habilitado: true,
    },
]

//1 - filtrar usuários com idades entre 18 e 65
//2 - se todos possuem cnh passaram no teste; se não, imprimir "todos precisam estar habilitados"

function validadorUsuários (lista){
    const filtroIdade = usuários.filter(x => x.idade >18 && x.idade<65);
    const filtroCnh = filtroIdade.every(x => x.habilitado);

    if(filtroCnh){
        console.log("Todos passaram no teste");
    }else{
        console.log("Todos precisam estar habilitados");
    }
};

validadorUsuários(usuários)