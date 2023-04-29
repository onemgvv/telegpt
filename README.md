# Grammy Template
Пример бота на библиотеке Grammy

Для запуска бота через веб-хук укажите порт в .env.prod (EXPRESS_PORT)  
Для запуска бота в режиме поллинга **НЕ** указывайте порт в .env.prod (EXPRESS_PORT)

## Описание файла .env

Существует 2 файла .env:
- .env.prod - Для запуска в режиме production
- .env.dev - Для запуска в режиме development

TOKEN - Токен вашего бота  
OWNER - ID владельца бота  

EXPRESS_PORT - Произвольный порт, на котором будет работать веб-хук

ORM_USERNAME - Имя пользователя СУБД  
ORM_PASSWORD - Пароль пользователя СУБД
ORM_HOST - Хост СУБД  
ORM_PORT - Порт, на котором работает СУБД  
ORM_DATABASE - Название базы данных