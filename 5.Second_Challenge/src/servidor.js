const express = require('express');

const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

const app = express();
app.use(express.json());

app.get('/contas', contas.listarTodasAsContas);
app.get('/contas/saldo', contas.saldo);
app.get('/contas/extrato', contas.extrato);
app.post('/contas', contas.criarConta);
app.patch('/contas/:numeroConta/usuario', contas.atualizarUsuarioConta);
app.delete('/contas/:numeroConta', contas.excluirConta);

app.post('/transacoes/depositar', transacoes.depositar);
app.post('/transacoes/sacar', transacoes.sacar);
app.post('/transacoes/transferir', transacoes.transferir);

module.exports = app;