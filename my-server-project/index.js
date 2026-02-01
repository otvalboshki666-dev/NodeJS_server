const express = require('express');
const app = express();
const PORT = 3000;

// Роут для главной страницы
app.get('/', (req, res) => {
    res.send('<h1>Привет, Октагон!</h1>');
});

// Роут для /static
app.get('/static', (req, res) => {
    res.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});

// Роут для /dynamic
app.get('/dynamic', (req, res) => {
    try {
        // Получаем параметры из строки запроса
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        const c = parseFloat(req.query.c);
        
        // Проверяем, что все параметры являются числами
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return res.json({
                header: "Error"
            });
        }
        
        // Вычисляем результат по формуле (a*b*c) / 3
        const result = (a * b * c) / 3;
        
        // Возвращаем результат
        res.json({
            header: "Calculated",
            body: result.toString()  // Преобразуем число в строку
        });
        
    } catch (error) {

        res.json({
            header: "Error"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});