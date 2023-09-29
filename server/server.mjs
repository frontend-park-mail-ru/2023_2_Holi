import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages','main.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages','login.html'))
})

app.get('/register/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages','register_create_password.html'))
})

app.get('/register/finish', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages','register_finish_acc.html'))
})

app.get('/register/was_created', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages','register_if_account_alredy_created.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})