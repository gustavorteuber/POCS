"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const Task_1 = require("./entities/Task");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
(0, typeorm_1.createConnection)({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [Task_1.Task],
})
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Conectado ao banco de dados SQLite');
    app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield connection.manager.find(Task_1.Task);
        res.json(tasks);
    }));
    app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, completed } = req.body;
        const task = new Task_1.Task();
        task.title = title;
        task.completed = completed || false;
        yield connection.manager.save(task);
        res.json(task);
    }));
    app.listen(port, () => {
        console.log(`Servidor está rodando na porta ${port}`);
    });
}))
    .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
