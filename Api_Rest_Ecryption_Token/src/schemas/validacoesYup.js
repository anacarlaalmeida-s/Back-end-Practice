const yup = require("yup");
const { pt } = require("yup-locale-pt");
const { setLocale } = require("yup");
setLocale(pt);

module.exports = yup;
