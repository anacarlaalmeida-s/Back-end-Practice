const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");

const transportador = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transportador.use('compile', handlebars({
  viewEngine: {
      extname: '.handlebars',
      defaultLayout: false
  },
  viewPath: '../views/'
}));

module.exports = transportador;