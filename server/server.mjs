import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public/assets')));
app.use(express.static(path.join(__dirname, '../public/img')));
app.use(express.static(path.join(__dirname, '../public/video')));
app.use(express.static(path.join(__dirname, '../public/fonts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages','main.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})