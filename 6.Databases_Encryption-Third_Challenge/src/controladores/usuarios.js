const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
  }
  if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório." });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório." });
  }
  if (!nome_loja) {
    return res
      .status(400)
      .json({ mensagem: "O campo nome_loja é obrigatório." });
  }

  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios } = await conexao.query(
      queryConsultaEmail,
      [email]
    );

    if (quantidadeUsuarios > 0) {
      return res.status(400).json({ mensagem: "O email informado já existe." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query =
      "insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)";
    const usuarioCadastrado = await conexao.query(query, [
      nome,
      email,
      senhaCriptografada,
      nome_loja,
    ]);

    if (usuarioCadastrado.rowCount === 0) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível cadastrar o usuário." });
    }

    return res.status(201).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { usuario } = req;

  if (!nome) {
    return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
  }
  if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório." });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório." });
  }
  if (!nome_loja) {
    return res
      .status(400)
      .json({ mensagem: "O campo nome_loja é obrigatório." });
  }

  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios, rows: perfil } = await conexao.query(
      queryConsultaEmail,
      [email]
    );

    if (quantidadeUsuarios > 0 && usuario.id !== perfil[0].id) {
      return res.status(400).json({
        mensagem: "O e-mail informado já se encontra cadastrado.",
      });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryUsuarioEditado =
      "update usuarios set nome=$1, email =$2, senha=$3, nome_loja=$4 where id=$5";
    const usuarioEditado = await conexao.query(queryUsuarioEditado, [
      nome,
      email,
      senhaCriptografada,
      nome_loja,
      usuario.id,
    ]);

    if (usuarioEditado.rowCount === 0) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o seu perfil." });
    }
    return res.status(201).send();
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  atualizarUsuario,
};
