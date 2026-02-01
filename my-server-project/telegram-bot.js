require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const config = require('./bot-config');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('Ошибка: TELEGRAM_BOT_TOKEN не установлен!');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Устанавливаем команды бота
bot.setMyCommands(config.commands);

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'Пользователь';
    
    const message = 
        `Привет, ${firstName}!\n` +
        `${config.messages.welcome}\n\n` +
        `Используйте /help чтобы увидеть все команды.`;
    
    bot.sendMessage(chatId, message);
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    let message = '📋 *Доступные команды:*\n\n';
    config.commands.forEach(cmd => {
        message += `/${cmd.command} - ${cmd.description}\n`;
    });
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Обработчик команды /site
bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    
    const message = `🌐 *Сайт Октагона:*\n${config.links.octagon}`;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Перейти на сайт', url: config.links.octagon }],
                [{ text: 'Карьера в Октагоне', url: config.links.octagonCareer }]
            ]
        }
    };
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    bot.sendMessage(chatId, 'Быстрые ссылки:', options);
});

// Обработчик команды /creator
bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    
    const message = 
        `👨‍💻 *Создатель бота:*\n\n` +
        `*ФИО:* ${config.creator.name}\n` +
        `*Telegram:* ${config.creator.telegram}\n` +
        `*GitHub:* ${config.creator.github}`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Запуск информации
console.log('Бот запущен с командами:');
config.commands.forEach(cmd => console.log(`  /${cmd.command}`));