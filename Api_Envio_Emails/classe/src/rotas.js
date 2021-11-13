const express = require('express');
const emails = require('./controladores/emails');

const rotas = express();

rotas.post('/cadastrar', emails.cadastroEmails);

rotas.post('/enviar', emails.enviarNewsletter);

module.exports = rotas;