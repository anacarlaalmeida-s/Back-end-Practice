const bancoDeDados = require("../bancodedados");
//não deu tempo (data de entrega) de refatorar para usar o doc das validações aqui :(

function depositar(req, res) {
  if (!req.body.numero_conta) {
    return res
      .status(400)
      .json({ mensagem: "Informe o número da conta de destino." });
  }

  if (!req.body.valor || req.body.valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "Informe o valor que será depositado." });
  }

  const contas = bancoDeDados.contas.find(
    (conta) => conta.numero === req.body.numero_conta
  );

  if (!contas) {
    return res
      .status(404)
      .json({ mensagem: "Não existe conta cadastrada no número informado." });
  }

  const deposito = {
    data: new Date(),
    numero_conta: req.body.numero_conta,
    valor: req.body.valor,
  };
  bancoDeDados.depositos.push(deposito);
  contas.saldo += deposito.valor;
  return res.status(200).json({ mensagem: "Depósito realizado com sucesso!" });
}

function sacar(req, res) {
  if (!req.body.numero_conta) {
    return res
      .status(400)
      .json({ mensagem: "É necessário informar o número da sua conta." });
  }

  if (!req.body.senha) {
    return res.status(400).json({ mensagem: "Digite sua senha." });
  }

  const contas = bancoDeDados.contas.find(
    (conta) => conta.numero === req.body.numero_conta
  );

  if (!contas) {
    return res
      .status(404)
      .json({ mensagem: "Não existe conta cadastrada no número informado." });
  }

  if (req.body.senha !== contas.usuario.senha) {
    return res.status(400).json({ mensagem: "Senha inválida." });
  }

  if (req.body.valor > contas.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente." });
  }
  const saque = {
    data: new Date(),
    numero_conta: req.body.numero_conta,
    valor: req.body.valor,
  };

  bancoDeDados.saques.push(saque);
  contas.saldo -= saque.valor;
  return res.status(200).json({ mensagem: "Saque realizado com sucesso!" });
}

function transferir(req, res) {
  if (!req.body.numero_conta_origem) {
    return res.status(400).json({ mensagem: "Informe o número da sua conta." });
  }

  if (!req.body.numero_conta_destino) {
    return res
      .status(400)
      .json({ mensagem: "Informe o número da conta de destino." });
  }

  if (!req.body.senha) {
    return res.status(400).json({ mensagem: "Digite sua senha." });
  }

  if (!req.body.valor || req.body.valor < 1) {
    return res
      .status(400)
      .json({ mensagem: "Informe o valor que será transferido." });
  }
  const contaOrigem = bancoDeDados.contas.find(
    (conta) => conta.numero === req.body.numero_conta_origem
  );
  const contaDestino = bancoDeDados.contas.find(
    (conta) => conta.numero === req.body.numero_conta_destino
  );
  if (!contaOrigem) {
    return res
      .status(404)
      .json({
        mensagem:
          "Verifique sua conta, não existe conta cadastrada no número informado.",
      });
  }

  if (!contaDestino) {
    return res
      .status(404)
      .json({
        mensagem:
          "Verifique a conta de destino, não existe conta cadastrada no número informado.",
      });
  }

  if (req.body.senha !== contaOrigem.usuario.senha) {
    return res.status(400).json({ mensagem: "Senha inválida." });
  }

  if (req.body.valor > contaOrigem.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente." });
  }
  const transferencia = {
    data: new Date(),
    numero_conta_origem: req.body.numero_conta_origem,
    numero_conta_destino: req.body.numero_conta_destino,
    valor: req.body.valor,
  };

  bancoDeDados.transferencias.push(transferencia);
  contaOrigem.saldo -= transferencia.valor;
  contaDestino.saldo += transferencia.valor;
  return res
    .status(200)
    .json({ mensagem: "Transferência realizada com sucesso!" });
}

module.exports = { depositar, sacar, transferir };
