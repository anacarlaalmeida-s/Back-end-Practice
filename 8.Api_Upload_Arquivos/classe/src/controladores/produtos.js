const knex = require("../conexao");
const supabase = require("../services/supabase");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    const produtos = await knex("produtos")
      .where({ usuario_id: usuario.id })
      .where((query) => {
        if (categoria) {
          return query.where("categoria", "ilike", `%${categoria}%`);
        }
      });

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .first();

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, preco, categoria, descricao, imagem, nomeImagem } =
    req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!estoque) {
    return res.status(404).json("O campo estoque é obrigatório");
  }

  if (!preco) {
    return res.status(404).json("O campo preco é obrigatório");
  }

  if (!descricao) {
    return res.status(404).json("O campo descricao é obrigatório");
  }

  try {
    if (imagem && nomeImagem) {
      const buffer = Buffer.from(imagem, "base64");
      await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(`usuario${usuario.id}/${nomeImagem}`, buffer);
    }
    const produto = await knex("produtos")
      .insert({
        usuario_id: usuario.id,
        nome,
        estoque,
        preco,
        categoria,
        descricao,
        imagem: `usuario${usuario.id}/${nomeImagem}`,
      })
      .returning("*");

    if (!produto) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const atualizarFotoProduto = async (req, res) => {
//   const { usuario } = req;
//   const { id } = req.params;
//   const { imagem, nomeImagem } = req.body;

//   if (!imagem) {
//     return res.status(404).json("O campo imagem é obrigatório");
//   }

//   if (!nomeImagem) {
//     return res.status(404).json("O campo nomeImagem é obrigatório");
//   }
//   try {
//     const produtoEncontrado = await knex("produtos")
//       .where({
//         id,
//         usuario_id: usuario.id,
//       })
//       .first();

//     if (!produtoEncontrado) {
//       return res.status(404).json("Produto não encontrado");
//     }

//     await supabase.storage
//       .from(process.env.SUPABASE_BUCKET)
//       .remove([produtoEncontrado.imagem]);

//     const buffer = Buffer.from(imagem, "base64");
//     await supabase.storage
//       .from(process.env.SUPABASE_BUCKET)
//       .upload(`usuario${usuario.id}/${nomeImagem}`, buffer);

//     const produtoAtualizado = await knex("produtos")
//       .where({
//         id,
//         usuario_id: usuario.id,
//       })
//       .update({
//         imagem: `usuario${usuario.id}/${nomeImagem}`,
//       });

//     if (!produtoAtualizado) {
//       return res.status(400).json("O produto não foi atualizado");
//     }

//     return res
//       .status(200)
//       .json("Imagem do produto foi atualizada com sucesso.");
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

const atualizarProduto = async (req, res) => {//atualizando imagem no bucket no mesmo endpoint 
  const { usuario } = req;
  const { id } = req.params;
  const { nome, estoque, preco, categoria, descricao, imagem, nomeImagem } =
    req.body;

  if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
    return res
      .status(404)
      .json("Informe ao menos um campo para atualizaçao do produto");
  }

  try {
    const produtoEncontrado = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    if(imagem && nomeImagem){
      await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([produtoEncontrado.imagem]);

    const buffer = Buffer.from(imagem, "base64");
    await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`usuario${usuario.id}/${nomeImagem}`, buffer);
    }

    const produtoAtualizado = await knex("produtos")
      .where({ id })
      .update({
        nome,
        estoque,
        preco,
        categoria,
        descricao,
        imagem: `usuario${usuario.id}/${nomeImagem}`,
      });

    if (!produtoAtualizado) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(200).json("produto foi atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const excluirFotoProduto = async (req, res) => {
//   const { usuario } = req;
//   const { id } = req.params;

//   try {
//     const produtoEncontrado = await knex("produtos")
//       .where({
//         id,
//         usuario_id: usuario.id,
//       })
//       .first();

//     if (!produtoEncontrado) {
//       return res.status(404).json("Produto não encontrado");
//     }

//     await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([produtoEncontrado.imagem]);

//     const produtoAtualizado = await knex("produtos")
//       .where({
//         id,
//         usuario_id: usuario.id,
//       })
//       .update({
//         imagem: null,
//       });

//     if (!produtoAtualizado) {
//       return res.status(400).json("O produto não foi atualizado");
//     }

//     return res.status(200).json("Imagem do produto excluida com sucesso.");
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

const excluirProduto = async (req, res) => {//excluindo imagem do bucket ao excluir o produto
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }
    await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([produtoEncontrado.imagem]);

    const produtoExcluido = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .del();

    if (!produtoExcluido) {
      return res.status(400).json("O produto não foi excluido");
    }

    return res.status(200).json("Produto excluido com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  // atualizarFotoProduto,
  atualizarProduto,
  // excluirFotoProduto,
  excluirProduto,
};
