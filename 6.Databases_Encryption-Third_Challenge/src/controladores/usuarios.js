const knex = require("../conexao");
const bcryptjs = require("bcryptjs");
const validacoesRegistroUsuarios = require("../schemas/validacoesRegistroUsuario");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  try {
    await validacoesRegistroUsuarios.validate(req.body);

    const buscaEmail = await knex("usuarios").where({ email }).first();

    if (buscaEmail) {
      return res.status(400).json("Esse e-mail já possui cadastro!");
    }
    const senhaCriptografada = await bcryptjs.hash(senha, 10);

    const novoUsuario = await knex("usuarios").insert({
      nome,
      email,
      senha: senhaCriptografada,
      nome_loja,
    });

    if (!novoUsuario) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }
    return res.status(201).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharUsuario = async (req, res) => {
  const { usuario } = req;
  try {
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { id } = req.usuario;

  try {
    await validacoesRegistroUsuarios.validate(req.body);

    if (nome) {
      req.body.nome = nome;
    }

    if (email) {
      if (email !== req.usuario.email) {
        const buscaEmail = await knex("usuarios").where({ email }).first();

        if (buscaEmail) {
          return res.status(400).json("Esse e-mail já possui cadastro!");
        }
      }

      req.body.email = email;
    }
    const senhaCriptografada = await bcryptjs.hash(senha, 10);

    if (senha) {
      req.body.senha = senhaCriptografada;
    }

    if (nome_loja) {
      req.body.nome_loja = nome_loja;
    }

    const usuarioAtualizado = await knex("usuarios")
      .update({ nome, email, senha: senhaCriptografada, nome_loja })
      .where({ id });

    if (!usuarioAtualizado) {
      return res.status(400).json("O usuario não foi atualizado");
    }
    return res.status(200).json("Usuario foi atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  atualizarUsuario,
};
