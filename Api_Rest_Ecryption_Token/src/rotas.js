const express = require("express");
const usuario = require("./controladores/usuarios");
const login = require("./controladores/login");
const produtos = require("./controladores/produtos");
const verificaLogin = require("./filtros/verificaLogin");

const rotas = express();

rotas.post("/usuario", usuario.cadastrarUsuario);

rotas.post("/login", login.login);

rotas.use(verificaLogin);

rotas.get("/usuario", usuario.detalharUsuario);
rotas.put("/usuario", usuario.atualizarUsuario);

rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:id", produtos.detalharProduto);
rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos/:id", produtos.atualizarProduto);
rotas.delete("/produtos/:id", produtos.excluirProduto);

module.exports = rotas;
