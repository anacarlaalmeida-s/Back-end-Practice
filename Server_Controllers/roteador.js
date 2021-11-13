const express = require("express");
const alunos = require("./controladores/alunos");

const roteador = express();

roteador.get("/alunos", alunos.consultarTodosOsAlunos);
roteador.get("/alunos/:idBuscado", alunos.consultarAluno);
roteador.post("/alunos", alunos.adicionarAluno);
roteador.patch("/alunos/:idBuscado", alunos.substituirAluno);
roteador.delete("/alunos/:idBuscado", alunos.excluirAluno);;


module.exports=roteador;