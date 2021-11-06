const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");

const transportador = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8f7181ef85cba4",
    pass: "ae3bd5eb6f69c5",
  },
});

transportador.use('compile', handlebars({
  viewEngine: {
      extname: '.handlebars',
      defaultLayout: false
  },
  viewPath: './views/'
}));

module.exports = transportador;