const knex = require("../conexao");
const nodemailer = require("../nodemailer");

const cadastroEmails = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!email) {
    return res.status(404).json("O campo email é obrigatório");
  }

  try {
    const buscaEmail = await knex("emails").where({ email }).first();

    if (buscaEmail) {
      return res.status(400).json("Esse e-mail já possui cadastro!");
    }

    await knex("emails").insert({ nome, email });

    return res.status(200).json("Email cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const enviarNewsletter = async (req, res) => {

  const { texto } = req.body;

  if (!texto) {
    return res.status(404).json("O campo texto é obrigatório");
  }

  try{

    const emails = await knex("emails");

    for(let cadastro of emails){
      const dadosEnvio = {
        from: "Cubos <nao-responder@newslettercubosacademy.com>", 
        to: cadastro.email,
        subject: "Newsletter Semanal - CubosAcademy",
        template: "newsletter",
        context: {
          nome: cadastro.nome,
          texto
        },
      };
      nodemailer.sendMail(dadosEnvio);
    }

    return res.status(200).json("Newsletter enviada com sucesso!")    

  }catch (error){
    return res.status(400).json(error.message);
  }  
}

module.exports = {
  cadastroEmails,
  enviarNewsletter
};
