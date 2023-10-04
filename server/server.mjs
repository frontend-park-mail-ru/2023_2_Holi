import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Глобальная переменная, содержащая путь к текущему файлу.
 * @global
 * @type {string}
 */
const __filename = fileURLToPath(import.meta.url);
/**
 * Глобальная переменная, содержащая директорию текущего файла.
 * @global
 * @type {string}
 */
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

/**
 * Порт, на котором запущен сервер Express.
 * @type {number}
 */
const port = 80;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
