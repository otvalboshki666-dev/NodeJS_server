const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Параметры подключения к БД
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // стандартный пользователь XAMPP
    password: '',       // по умолчанию пустой пароль в XAMPP
    database: 'ChatBotTests'
});

// Подключение к БД
db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err);
        return;
    }
    console.log('Успешное подключение к БД MySQL');
});

// Middleware для обработки данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Главная страница
app.get('/', (req, res) => {
    res.send('<h1>Привет, Октагон!</h1>');
});

// 2. Статический роут
app.get('/static', (req, res) => {
    res.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});

// 3. Динамический роут
app.get('/dynamic', (req, res) => {
    try {
        const a = parseFloat(req.query.a);
        const b = parseFloat(req.query.b);
        const c = parseFloat(req.query.c);
        
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return res.json({ header: "Error" });
        }
        
        const result = (a * b * c) / 3;
        res.json({
            header: "Calculated",
            body: result.toString()
        });
    } catch (error) {
        res.json({ header: "Error" });
    }
});

// 4. Получить все записи (GET)
app.get('/getAllItems', (req, res) => {
    const sql = 'SELECT * FROM Items';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Ошибка при получении записей:', err);
            return res.json([]); // Возвращаем пустой массив при ошибке
        }
        res.json(results);
    });
});

// 5. Добавить запись (POST)
app.post('/addItem', (req, res) => {
    const { name, desc } = req.query;
    
    // Проверка параметров
    if (!name || !desc || typeof name !== 'string' || typeof desc !== 'string') {
        return res.json(null);
    }
    
    const sql = 'INSERT INTO Items (name, description) VALUES (?, ?)';
    
    db.query(sql, [name, desc], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении:', err);
            return res.json(null);
        }
        
        // Возвращаем созданный объект
        const newItem = {
            id: result.insertId,
            name: name,
            description: desc
        };
        res.json(newItem);
    });
});

// 6. Удалить запись (POST)
app.post('/deleteItem', (req, res) => {
    const { id } = req.query;
    const itemId = parseInt(id);
    
    // Проверка параметров
    if (!itemId || isNaN(itemId)) {
        return res.json(null);
    }
    
    // Сначала проверим существование записи
    const checkSql = 'SELECT * FROM Items WHERE id = ?';
    
    db.query(checkSql, [itemId], (err, results) => {
        if (err) {
            console.error('Ошибка при проверке:', err);
            return res.json(null);
        }
        
        if (results.length === 0) {
            return res.json({}); // Пустой объект, если запись не найдена
        }
        
        // Удаляем запись
        const deleteSql = 'DELETE FROM Items WHERE id = ?';
        
        db.query(deleteSql, [itemId], (err, result) => {
            if (err) {
                console.error('Ошибка при удалении:', err);
                return res.json(null);
            }
            
            // Возвращаем удаленный объект
            res.json(results[0]);
        });
    });
});

// 7. Обновить запись (POST)
app.post('/updateItem', (req, res) => {
    const { id, name, desc } = req.query;
    const itemId = parseInt(id);
    
    // Проверка параметров
    if (!itemId || isNaN(itemId) || !name || !desc || 
        typeof name !== 'string' || typeof desc !== 'string') {
        return res.json(null);
    }
    
    // Сначала проверим существование записи
    const checkSql = 'SELECT * FROM Items WHERE id = ?';
    
    db.query(checkSql, [itemId], (err, results) => {
        if (err) {
            console.error('Ошибка при проверке:', err);
            return res.json(null);
        }
        
        if (results.length === 0) {
            return res.json({}); // Пустой объект, если запись не найдена
        }
        
        // Обновляем запись
        const updateSql = 'UPDATE Items SET name = ?, description = ? WHERE id = ?';
        
        db.query(updateSql, [name, desc, itemId], (err, result) => {
            if (err) {
                console.error('Ошибка при обновлении:', err);
                return res.json(null);
            }
            
            // Возвращаем обновленный объект
            const updatedItem = {
                id: itemId,
                name: name,
                description: desc
            };
            res.json(updatedItem);
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`База данных: ChatBotTests`);
});Set-ExecutionPolicy RemoteSigned -Scope CurrentUser