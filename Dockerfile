# Используем официальный образ Node.js с Docker Hub
FROM node:14-alpine

# Устанавливаем директорию приложения
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем файлы проекта в рабочую директорию
COPY . .

# Компилируем TypeScript-код в JavaScript-код
RUN npm run build

# Определяем переменные окружения, если необходимо
ENV NODE_ENV=prod

# Открываем порт, на котором работает приложение
EXPOSE 5144

# Запускаем приложение
CMD ["npm", "start"]