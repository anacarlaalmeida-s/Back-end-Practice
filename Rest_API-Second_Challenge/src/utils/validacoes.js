const bancoDeDados = require('../bancodedados');

function validar_cpf_email(dados) {

    for (let item of bancoDeDados.contas) {
        if (dados.cpf === item.usuario.cpf || dados.email === item.usuario.email) {
            return "Já existe uma conta cadastrada no CPF ou Email informado."
        }
    };
};

function validarConta(numeroConta) {

    const conta = bancoDeDados.contas.find(
        (conta) => conta.numero === Number(numeroConta)
    );

    if (!conta) {
        return "Não existe conta cadastrada no número informado."
    };
};

function validarSenha(senhaDigitada) {

    const usuario = bancoDeDados.contas.find(
        (conta) => conta.usuario.senha === senhaDigitada)

    if (!usuario) {
        return "Senha inválida."
    };
};

module.exports = {validar_cpf_email, validarConta, validarSenha};