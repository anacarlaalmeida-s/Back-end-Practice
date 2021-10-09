const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaToken = require("../senhaToken");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(400).json({mensagem: "O campo nome é obrigatório."});
  }
  if (!email) {
    return res.status(400).json({mensagem:"O campo email é obrigatório."});
  }
  if (!senha) {
    return res.status(400).json({mensagem:"O campo senha é obrigatório."});
  }
  if (!nome_loja) {
    return res.status(400).json({mensagem:"O campo nome_loja é obrigatório."});
  }

  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios } = await conexao.query(
      queryConsultaEmail,
      [email]
    );

    if (quantidadeUsuarios > 0) {
      return res.status(400).json({mensagem:"O email informado já existe."});
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
      return res.status(400).json({mensagem:"Não foi possível cadastrar o usuário."});
    }

    return res.status(201).json({mensagem:"Usuário cadastrado com sucesso."});
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({mensagem:"O campo email e senha são obrigatórios."});
  }

  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rows, rowCount } = await conexao.query(queryConsultaEmail, [email]);

    if (rowCount === 0) {
      return res.status(404).json({mensagem:"Usuário não encontrado."});
    }

    const usuario = rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(401).json({mensagem:"Usuário e/ou senha inválido(s)."});
    }

    const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: "6h" });
    return res.status(201).json({token: token});
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const detalharUsuario = async (req, res) => {
  const { usuario } = req;

  try {
    await conexao.query("select * from usuarios where id = $1", [
      usuario.id,
    ]);
    const { senha, ...perfilExibido } = usuario;
    return res.status(200).json(perfilExibido);
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { usuario } = req;

  if (!nome) {
    return res.status(400).json({mensagem:"O campo nome é obrigatório."});
  }
  if (!email) {
    return res.status(400).json({mensagem:"O campo email é obrigatório."});
  }
  if (!senha) {
    return res.status(400).json({mensagem:"O campo senha é obrigatório."});
  }
  if (!nome_loja) {
    return res.status(400).json({mensagem:"O campo nome_loja é obrigatório."});
  }

  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios, rows: perfil } = await conexao.query(
      queryConsultaEmail,
      [email]
    );

    if (quantidadeUsuarios > 0 && usuario.id !== perfil[0].id) {
      return res.status(400)
        .json({mensagem:"O e-mail informado já está sendo utilizado por outro usuário."});
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
      return res.status(400).json({mensagem: "Não foi possível atualizar o seu perfil."});
    }
    return res.status(201).json();
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
};
