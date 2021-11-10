const knex = require("../conexao");
const jwt = require("jsonwebtoken");
const senhaToken = require("../senhaToken");

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const token = authorization.replace("Bearer", "").trim();
    const { id } = jwt.verify(token, senhaToken);

    const buscaUsuario = await knex("usuarios").where({id}).first();

    if(!buscaUsuario){
      return res.status(404).json("Usuário não encontrado.");
    }

    const { senha, ...usuario } = buscaUsuario;
    req.usuario = usuario;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }
    return res.status(500).json(error.message);    
  }
};

module.exports = verificaLogin;
