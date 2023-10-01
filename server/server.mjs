import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'))
})



const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})
