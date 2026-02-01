// bot-config.js
module.exports = {

    creator: {
        name: 'Русакова Александра Максимовна',
        telegram: '@FlatChestIsFineToo',
        github: 'https://github.com/otvalboshki666-dev'
    },
    
    // Команды бота
    commands: [
        { command: 'start', description: 'Начать диалог' },
        { command: 'help', description: 'Показать список команд' },
        { command: 'site', description: 'Получить ссылку на сайт Октагона' },
        { command: 'creator', description: 'Информация о создателе' },
        { command: 'info', description: 'Информация о боте' },
        { command: 'test', description: 'Проверить работу бота' }
    ],
    
    // Ссылки
    links: {
        octagon: 'https://octagon.space/',
        octagonCareer: 'https://octagon.space/career',
        githubRepo: 'https://github.com/your-username/my-server-project'
    },
    
    // Текстовые сообщения
    messages: {
        welcome: 'Привет, октагон!',
        unknownCommand: '❌ Неизвестная команда. Используйте /help для списка команд.'
    }
};