const yup = require("./validacoesYup");

const validacoesRegistroProduto = yup.object().shape({
    nome: yup.string().required(),
    quantidade: yup.number().required().positive().integer(),
    categoria: yup.string(),
    descricao: yup.string().required(),
    preco: yup.number().required().positive().integer(),
    imagem:yup.string(),
});

module.exports = validacoesRegistroProduto;