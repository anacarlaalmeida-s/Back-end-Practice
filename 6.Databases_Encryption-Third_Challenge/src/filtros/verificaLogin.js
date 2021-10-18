const conexao = require("../conexao");
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

    const query = "select * from usuarios where id = $1";
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }
    const { senha, ...usuario } = rows[0];

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
    res.status(500).json(error.message);
    return;
  }
};

module.exports = verificaLogin;
