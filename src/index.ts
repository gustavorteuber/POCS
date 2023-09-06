import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from 'express';
import { Task } from './entities/Task';

const app = express();
const port = 3000;

app.use(express.json());

createConnection({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [Task],
})
  .then(async (connection) => {
    console.log('Conectado ao banco de dados SQLite');

    app.get('/tasks', async (req, res) => {
      const tasks = await connection.manager.find(Task);
      res.json(tasks);
    });

    app.post('/tasks', async (req, res) => {
      const { title, completed } = req.body;
      const task = new Task();
      task.title = title;
      task.completed = completed || false;
      await connection.manager.save(task);
      res.json(task);
    });

    app.listen(port, () => {
      console.log(`Servidor está rodando na porta ${port}`);
    });
  })
  .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
