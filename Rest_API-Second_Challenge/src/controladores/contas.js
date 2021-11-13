const bancoDeDados = require("../bancodedados");
const {
  validar_cpf_email,
  validarConta,
  validarSenha,
} = require("../utils/validacoes");

function listarTodasAsContas(req, res) {
  if (req.query.senha_banco !== bancoDeDados.banco.senha) {
    return res
      .status(401)
      .json({ erro: "Senha de acesso incorreta ou não informada!" });
  }
  return res.status(200).json(bancoDeDados.contas);
}

let proximoNumero = 1;

function criarConta(req, res) {
  const cpf_email_cadastrados = validar_cpf_email(req.body);
  if (cpf_email_cadastrados) {
    return res.status(400).json({ mensagem: cpf_email_cadastrados });
  }

  if (!req.body.nome) {
    return res.status(400).json({ mensagem: "O campo 'Nome' é obrigatório." });
  }

  if (!req.body.cpf) {
    return res.status(400).json({ mensagem: "O campo 'CPF' é obrigatório." });
  }

  if (!req.body.data_nascimento) {
    return res
      .status(400)
      .json({ mensagem: "O campo 'Data Nascimento' é obrigatório." });
  }

  if (!req.body.telefone) {
    return res
      .status(400)
      .json({ mensagem: "O campo 'Telefone' é obrigatório." });
  }

  if (!req.body.email) {
    return res.status(400).json({ mensagem: "O campo 'Email' é obrigatório." });
  }

  if (!req.body.senha) {
    return res.status(400).json({ mensagem: "O campo 'Senha' é obrigatório." });
  }

  const novaConta = {
    numero: proximoNumero,
    saldo: 0,
    usuario: {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha,
    },
  };
  bancoDeDados.contas.push(novaConta);
  proximoNumero += 1;
  res.status(201).json(novaConta);
}

function atualizarUsuarioConta(req, res) {
  const contaNaoCadastrada = validarConta(req.params.numeroConta);
  if (contaNaoCadastrada) {
    return res.status(404).json({ mensagem: contaNaoCadastrada });
  }

  const cpf_email_cadastrados = validar_cpf_email(req.body);
  if (cpf_email_cadastrados) {
    return res.status(400).json({ mensagem: cpf_email_cadastrados });
  }

  if (
    !req.body.nome &&
    !req.body.cpf &&
    !req.body.data_nascimento &&
    !req.body.telefone &&
    !req.body.email &&
    !req.body.senha
  ) {
    return res
      .status(400)
      .json({
        mensagem: "Para prosseguir, insira pelo menos um dado a ser alterado.",
      });
  }

  const dadosUsuario = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(req.params.numeroConta)
  );

  if (req.body.nome !== undefined) {
    dadosUsuario.usuario.nome = req.body.nome;
  }

  if (req.body.cpf !== undefined) {
    dadosUsuario.usuario.cpf = req.body.cpf;
  }

  if (req.body.data_nascimento !== undefined) {
    dadosUsuario.usuario.data_nascimento = req.body.data_nascimento;
  }

  if (req.body.telefone !== undefined) {
    dadosUsuario.usuario.telefone = req.body.telefone;
  }

  if (req.body.email !== undefined) {
    dadosUsuario.usuario.email = req.body.email;
  }

  if (req.body.senha !== undefined) {
    dadosUsuario.usuario.senha = req.body.senha;
  }

  return res.status(201).json({ mensagem: "Conta atualizada com sucesso!" });
}

function saldo(req, res) {
  if (!req.query.numero_conta || !req.query.senha) {
    return res
      .status(400)
      .json({
        mensagem: "Para prosseguir informe o número e a senha da conta.",
      });
  }

  const contaNaoCadastrada = validarConta(req.query.numero_conta);
  if (contaNaoCadastrada) {
    return res.status(404).json({ mensagem: contaNaoCadastrada });
  }

  const senhaInvalida = validarSenha(req.query.senha);
  if (senhaInvalida) {
    return res.status(400).json({ mensagem: senhaInvalida });
  }

  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(req.query.numero_conta)
  );

  return res.status(200).json({ saldo: conta.saldo });
}

function extrato(req, res) {
  if (!req.query.numero_conta || !req.query.senha) {
    return res
      .status(400)
      .json({
        mensagem: "Para prosseguir informe o número e a senha da conta.",
      });
  }

  const contaNaoCadastrada = validarConta(req.query.numero_conta);
  if (contaNaoCadastrada) {
    return res.status(404).json({ mensagem: contaNaoCadastrada });
  }

  const senhaInvalida = validarSenha(req.query.senha);
  if (senhaInvalida) {
    return res.status(400).json({ mensagem: senhaInvalida });
  }

  let extratoPessoal = {
    depositos: [],
    saques: [],
    transferenciasEnviadas: [],
    transferenciasRecebidas: [],
  };
  
  for (let item of bancoDeDados.depositos) {
    if (item.numero_conta === Number(req.query.numero_conta)) {
      extratoPessoal.depositos.push(item);
    }
  }
  for (let item of bancoDeDados.saques) {
    if (item.numero_conta === Number(req.query.numero_conta)) {
      extratoPessoal.saques.push(item);
    }
  }
  for (let item of bancoDeDados.transferencias) {
    if (item.numero_conta_origem === Number(req.query.numero_conta)) {
      extratoPessoal.transferenciasEnviadas.push(item);
    }
  }
  for (let item of bancoDeDados.transferencias) {
    if (item.numero_conta_destino === Number(req.query.numero_conta)) {
      extratoPessoal.transferenciasRecebidas.push(item);
    }
  }
  return res.status(200).json(extratoPessoal);
}

function excluirConta(req, res) {
  const contaNaoCadastrada = validarConta(req.params.numeroConta);
  if (contaNaoCadastrada) {
    return res.status(404).json({ mensagem: contaNaoCadastrada });
  }

  const saldoConta = bancoDeDados.contas.find((conta) => conta.saldo >= 1);

  if (saldoConta) {
    return res
      .status(400)
      .json({
        mensagem: "É necessário zerar o saldo da conta antes de excluí-la.",
      });
  }

  const conta = Number(req.params.numeroConta);
  const indice = bancoDeDados.contas.indexOf(conta);
  bancoDeDados.contas.splice(indice, 1);
  return res.status(200).json({ mensagem: "Conta excluída com sucesso!" });
}

module.exports = {
  listarTodasAsContas,
  criarConta,
  atualizarUsuarioConta,
  saldo,
  extrato,
  excluirConta,
};
