const conexao = require("../conexao");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    if (categoria) {
      const produtosCategoria = await conexao.query(
        "select * from produtos where categoria=$1 and usuario_id = $2",
        [categoria, usuario.id]
      );
      return res.status(200).json(produtosCategoria.rows);
    }

    const produtos = await conexao.query(
      "select * from produtos where usuario_id = $1",
      [usuario.id]
    );
    return res.status(200).json(produtos.rows);
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const detalharProduto = async (req, res) => {
  const { usuario } = req;
  const { id: idProduto } = req.params;

  try {
    const produtoPesquisado = await conexao.query(
      "select * from produtos where id=$1",
      [idProduto]
    );

    if (produtoPesquisado.rowCount === 0) {
      return res
        .status(404)
        .json({mensagem:`Não existe produto cadastrado com ID ${idProduto}.`});
    }
    if (produtoPesquisado.rows[0].usuario_id !== usuario.id) {
      return res
        .status(403)
        .json({mensagem:"O usuário logado não tem permissão para acessar este produto."});
    }
    
    return res.status(200).json({...produtoPesquisado.rows[0]});
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const cadastrarProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;

  if (!nome) {
    return res.status(400).json({mensagem:"O nome do produto deve ser informado."});
  }
  if (!quantidade) {
    return res.status(400).json({mensagem:"A quantidade do produto deve ser informada."});
  }
  if (!preco) {
    return res.status(400).json({mensagem:"O preço do produto deve ser informado."});
  }
  if (!descricao) {
    return res.status(400).json({mensagem:"A descrição do produto deve ser informada."});
  }
  if (quantidade <= 0) {
    return res.status(400).json({mensagem:"O campo quantidade precisa ser maior que 0."});
  }

  try {
    const queryProduto =
      "insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)";
    const produto = await conexao.query(queryProduto, [
      usuario.id,
      nome,
      quantidade,
      categoria,
      preco,
      descricao,
      imagem,
    ]);

    if (produto.rowCount === 0) {
      return res.status(400).json({mensagem:"Não foi possível cadastrar o produto."});
    }
    return res.status(201).json();
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const atualizarProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;
  const { id: idProduto } = req.params;

  if (!nome) {
    return res.status(400).json({mensagem:"O nome do produto deve ser informado."});
  }
  if (!quantidade) {
    return res.status(400).json({mensagem:"A quantidade do produto deve ser informada."});
  }
  if (!preco) {
    return res.status(400).json({mensagem:"O preço do produto deve ser informado."});
  }
  if (!descricao) {
    return res.status(400).json({mensagem:"A descrição do produto deve ser informada."});
  }
  if (quantidade <= 0) {
    return res.status(400).json({mensagem:"O campo quantidade precisa ser maior que 0."});
  }

  try {
    const produtoPesquisado = await conexao.query(
      "select * from produtos where id=$1",
      [idProduto]
    );

    if (produtoPesquisado.rowCount === 0) {
      return res
        .status(404)
        .json({mensagem:`Não existe produto cadastrado com ID ${idProduto}.`});
    }
    if (produtoPesquisado.rows[0].usuario_id !== usuario.id) {
      return res
        .status(403)
        .json({mensagem:"O usuário logado não tem permissão para alterar este produto."});
    }

    const queryProdutoEditado =
      "update produtos set nome=$1, quantidade =$2, categoria=$3, preco=$4, descricao=$5, imagem=$6 where usuario_id=$7";
    const produtoEditado = await conexao.query(queryProdutoEditado, [
      nome,
      quantidade,
      categoria,
      preco,
      descricao,
      imagem,
      usuario.id,
    ]);

    if (produtoEditado.rowCount === 0) {
      return res.status(400).json({mensagem:"Não foi possível atualizar o produto."});
    }
    return res.status(201).json();
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id: idProduto } = req.params;

  try {
    const produtoPesquisado = await conexao.query(
      "select * from produtos where id=$1",
      [idProduto]
    );

    if (produtoPesquisado.rowCount === 0) {
      return res
        .status(404)
        .json({mensagem:`Não existe produto cadastrado com ID ${idProduto}.`});
    }
    if (produtoPesquisado.rows[0].usuario_id !== usuario.id) {
      return res
        .status(403)
        .json({mensagem:"O usuário logado não tem permissão para excluir este produto."});
    }

    const produtoExcluido = await conexao.query(
      "delete from produtos where id = $1",
      [idProduto]
    );

    if (produtoExcluido.rowCount === 0) {
      return res.status(400).json({mensagem:"Não foi possível atualizar o produto."});
    }

    return res.status(200).json();
  } catch (error) {
    res.status(500).json(error.message); return
  }
};

module.exports = {
  listarProdutos,
  detalharProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
