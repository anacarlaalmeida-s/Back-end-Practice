const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', contas.listarTodasAsContas);
rotas.get('/contas/saldo', contas.saldo);
rotas.get('/contas/extrato', contas.extrato);
rotas.post('/contas', contas.criarConta);
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', contas.excluirConta);

rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', transacoes.sacar);
rotas.post('/transacoes/transferir', transacoes.transferir);

module.exports = rotas;