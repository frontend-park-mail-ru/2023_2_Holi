import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '../manifest.json')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.get(/^(?!.*\.(css|js|img|png|webp|webm|svg)).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});
const port = 80;
app.listen(port, () => {
    console.info(`Сервер запущен на порту ${port}`);
});
