const express = require("express");
const usuario = require("./controladores/usuarios");
const produtos = require("./controladores/produtos");
const verificaLogin = require("./filtros/verificaLogin");

const rotas = express();

//usuario e login
rotas.post("/usuario", usuario.cadastrarUsuario);
rotas.post("/login", usuario.login);

//todas as rotas abaixo são validadas
rotas.use(verificaLogin);

rotas.get("/usuario", usuario.detalharUsuario);
rotas.put("/usuario", usuario.atualizarUsuario);

//produtos
rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:id", produtos.detalharProduto);
rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos/:id", produtos.atualizarProduto);
rotas.delete("/produtos/:id", produtos.excluirProduto);

module.exports = rotas;
