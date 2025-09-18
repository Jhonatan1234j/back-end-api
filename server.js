import express from "express";      // Requisição do pacote do express
import dotenv from "dotenv";        // Requisição do pacote dotenv para variáveis de ambiente
import { Pool } from "pg";          // Requisição do pacote pg para PostgreSQL

dotenv.config();                   // Carrega e processa o arquivo .env

const app = express();             // Instancia o Express
const port = 3000;                 // Define a porta

// Inicializa o Pool de conexão com o banco de dados
const db = new Pool({  
  connectionString: process.env.URL_BD,  // Conexão com o banco de dados via variáveis de ambiente
});

app.get("/", async (req, res) => {  // Cria endpoint na rota da raiz do projeto com função assíncrona
  console.log("Rota GET / solicitada");

  let dbStatus = "ok";  // Inicializa o status do banco como 'ok'

  // Testa a conexão com o banco
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;  // Se houver erro, armazena a mensagem do erro
  }

  // Resposta com o status do banco
  res.json({
    message: "API para estudo de Node e Express",  // Substitua pelo conteúdo da sua API
    author: "Jhonatan Diogo Rodrigues Nunes",     // Substitua pelo seu nome
    statusBD: dbStatus,                           // Status do Banco de Dados
  });
});

app.listen(port, () => {  // Um socket para "escutar" as requisições
  console.log(`Serviço rodando na porta: ${port}`);
});
