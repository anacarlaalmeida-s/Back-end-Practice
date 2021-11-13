const alunos = require("../dados/alunos");
const cursos = require("../dados/cursos");

let proximoId = 1;

function consultarTodosOsAlunos(req, res) {
    res.status(200);
    res.json(alunos)
};

function consultarAluno(req, res) {
    const aluno = alunos.find(
        aluno => aluno.id === Number(req.params.idBuscado)
    );

    if (aluno) {
        res.status(200);
        res.json(aluno)
    } if (!Number(req.params.idBuscado)) {
        res.status(400);
        res.json({ erro: "É necessário informar um número válido para prosseguir com a busca." })
    } else {
        res.status(404);
        res.json({ erro: "Não existe aluno cadastrado no id informado." })
    }
};

function adicionarAluno(req, res) {
    const novoAluno = {
        id: proximoId,
        nome: req.body.nome.trim(),
        sobrenome: req.body.sobrenome.trim(),
        idade: req.body.idade,
        curso: req.body.curso.trim()
    }
  
    const aluno = alunos.find(aluno => aluno.nome === req.body.nome.trim() 
    && aluno.sobrenome === req.body.sobrenome.trim() 
    && aluno.idade === req.body.idade);

    const curso = cursos.includes(req.body.curso);

    if (aluno){
        res.status(400);
        res.json({mensagem:"Verificar, pois o aluno já se encontra cadastrado!"})
       return;
    }
    if (!req.body.nome || req.body.nome === "" || req.body.nome.trim() === "") {
        res.status(400);
        res.json({ erro: "O campo nome é obrigatório." })
        return;
    } if (!req.body.sobrenome || req.body.sobrenome === "" || req.body.sobrenome.trim() === "") {
        res.status(400);
        res.json({ erro: "O campo sobrenome é obrigatório." })
        return;
    } if (!req.body.idade || req.body.idade === "") {
        res.status(400);
        res.json({ erro: "O campo idade é obrigatório." })
        return;
    } if (!req.body.curso || req.body.curso === "" || req.body.curso.trim() === "") {
        res.status(400);
        res.json({ erro: "O campo curso é obrigatório." })
        return;
    } if (req.body.idade < 18) {
        res.status(400);
        res.json({ erro: "O aluno deve ser maior de idade." })
        return;
    } if(!curso)  {
        res.status(400);
        res.json({ erro: "Favor verificar o curso digitado, pois ele não se encontra em nossa lista de cursos" })
        return;
    }     
    res.status(201);
    res.send("");
    alunos.push(novoAluno);
    proximoId += 1;
};

function substituirAluno (req,res){
    if (req.body.id !== Number(req.params.idBuscado)) {
        res.status(400);
        res.json({ erro: "Há conflito nas informações do 'id', por favor verificar.", });
        return;
    };    
    const aluno = alunos.find(
        aluno => aluno.id === Number(req.params.idBuscado)
    );
    if (!aluno) {
        res.status(404);
        res.json({mensagem: "Não existe aluno cadastrado no id informado."});
        return;
    } 
    if(req.body.nome !== undefined){
        aluno.nome = req.body.nome
    } 
    if(req.body.sobrenome !== undefined){
        aluno.sobrenome = req.body.sobrenome
    } 
    if(req.body.idade !== undefined){
        aluno.idade = req.body.idade
    } 
    if(req.body.curso !== undefined){
        aluno.curso  = req.body.curso 
    }
    res.status(201);
    res.json({mensagem:"Dado(s) aletarado(s) com sucesso!"}) 
    
}

function excluirAluno (req, res){
    const aluno = alunos.find(
        aluno => aluno.id === Number(req.params.idBuscado)
    );

    if (!aluno) {
        res.status(404);
        res.json({mensagem: "Não existe aluno cadastrado no id informado."});
        return;
    } 
    const indice = alunos.indexOf(aluno);
    alunos.splice(indice,1);
    res.json(aluno);
};
module.exports = { consultarTodosOsAlunos, consultarAluno, adicionarAluno, substituirAluno, excluirAluno}