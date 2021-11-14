const yup = require("./validacoesYup");

const validacoesRegistroUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().min(4).max(10).required(),
    nome_loja: yup.string().required()
});

module.exports = validacoesRegistroUsuario;