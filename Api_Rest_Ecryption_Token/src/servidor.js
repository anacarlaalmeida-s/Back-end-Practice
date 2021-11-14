require('dotenv').config();
const express = require('express');
const rotas = require("./rotas");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

module.exports = app;