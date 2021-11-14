const knex = require("../conexao");
const validacoesRegistroProduto = require("../schemas/validacoesRegistroProduto");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    if (categoria) {
      const produtosDaCategoria = await knex("produtos")
        .where("usuario_id", usuario.id)
        .andWhere({ categoria })
        .returning("*");
      return res.status(200).json(produtosDaCategoria);
    }
    const listaProdutos = await knex("produtos")
      .where("usuario_id", usuario.id)
      .returning("*");

    return res.status(200).json(listaProdutos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({
      mensagem: "O ID do prodouto deve ser um número inteiro positivo válido.",
    });
  }

  try {
    const produto = await knex("produtos")
      .where("usuario_id", usuario.id)
      .andWhere({ id })
      .first();

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    return res.status(200).json(produto);
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

const cadastrarProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;

  try {
    await validacoesRegistroProduto.validate(req.body);

    const novoProduto = await knex("produtos").insert({
      usuario_id: usuario.id,
      nome,
      quantidade,
      categoria,
      preco,
      descricao,
      imagem,
    });

    if (!novoProduto) {
      return res.status(400).json("O produto não foi cadastrado");
    }
    return res.status(201).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;
  const { id } = req.params;

  try {
    await validacoesRegistroProduto.validate(req.body);

    const produto = await knex("produtos")
      .where("usuario_id", usuario.id)
      .andWhere({ id })
      .first();

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    if (nome) {
      req.body.nome = nome;
    }

    if (quantidade) {
      req.body.quantidade = quantidade;
    }

    if (categoria) {
      req.body.categoria = categoria;
    }

    if (descricao) {
      req.body.descricao = descricao;
    }

    if (preco) {
      req.body.preco = preco;
    }

    if (imagem) {
      req.body.imagem = imagem;
    }

    const produtoAtualizado = await knex("produtos")
      .update({ nome, quantidade, categoria, preco, descricao, imagem })
      .where({ id });

    if (!produtoAtualizado) {
      return res.status(400).json("O produto não foi atualizado");
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .where("usuario_id", usuario.id)
      .andWhere({ id })
      .first();

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    const produtoExcluido = await knex("produtos").del().where({ id });
    if (!produtoExcluido) {
      return res.status(400).json("O produto não foi excluido");
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).json(error.message);
    return;
  }
};

module.exports = {
  listarProdutos,
  detalharProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
