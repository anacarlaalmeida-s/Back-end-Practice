const knex = require("../conexao");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const senhaToken = require("../senhaToken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "O campo email e senha são obrigatórios." });
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();
    if (!usuario) {
      return res.status(404).json("Usuário não encontrado!");
    }

    const validandoSenha = await bcryptjs.compare(senha, usuario.senha);

    if (!validandoSenha) {
      return res.status(400).json("Email e senha não confere");
    }
    const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: "6h" });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { login };
