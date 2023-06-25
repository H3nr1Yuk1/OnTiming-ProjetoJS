export {};
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

// config do banco
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "database.db",
});

// definição das rotinas
const Rotina = sequelize.define("Rotina", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDuracao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// criação da tabela
Rotina.sync();

// config do express
const app = express();
app.use(express.json());

// rota para criar uma rotina
app.post("/rotinas", async (req : any, res : any) => {
  try {
    const { nome, duracao, tipoDuracao } = req.body;

    // criando uma rotina no banco
    const novaRotina = await Rotina.create({
      nome,
      duracao,
      tipoDuracao,
    });

    res.status(201).json(novaRotina);
  } catch (error) {
    console.error("Erro ao criar a rotina!", error);
    res.status(500).json({ error: "Erro ao criar a rotina." });
  }
});

// funcionalidade para obter todas as rotinas cadastradas
app.get("/rotinas", async (req : any, res : any) => {
  try {
    const rotinas = await Rotina.findAll();

    res.json(rotinas);
  } catch (error) {
    console.error("Erro ao obter as rotinas:", error);
    res.status(500).json({ error: "Erro ao obter as rotinas" });
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
