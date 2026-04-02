<div align="center">

<h1>
Киндер - Система автоматизации детского сада
</h1>

[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-1EBEBA?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-FFF42B?style=for-the-badge&logo=framer&logoColor=black)](https://www.framer.com/motion/)

[![Project Version](https://img.shields.io/badge/version-alpha_0.7-red?style=flat-square)](https://github.com/YanderuxTea/kinder-panel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

<h2>RoadMap</h2>

- [x] Настройка и контейниризация проекта
- [x] Схема БД
- [x] Регистрация садика + логика 14 дневного триала
- [x] Разделение на роли (Администратор | Администратор садика | Воспитатель | Родитель)
- [x] Кэширование сессий
- [x] Главная страница
- [x] Страницы входа / регистрации / сброса пароля
- [x] Интерфейс Супер-админа
- [x] Управление подписками
- [x] Создание групп
- [x] Создание аккаунтов воспитателей и родителей администратором садика
- [x] Личный кабинет для пользователей / вкладка настройки
- [x] Страница создания меню садика для администраторов садика
- [ ] Возможность заранее отмечать родителям статусы (опоздает/не придет) с причиной
- [ ] Возможность составлять отчет посещения воспитателю
- [ ] Возможность администратору садика смотреть отчеты посещения
- [ ] Просмотр меню на неделю для родителей
- [x] Возможность воспитателю оставлять объявления и удалять
- [x] Возможность смотреть объявления
- [x] Уведомления для родителей, если добавляется объявление

<h2>Как запустить проект у себя</h2>

1. `git clone https://github.com/YanderuxTea/kinder-panel.git`
2. `cd kinder-panel`
3. `pnpm dev:docker` - открыты порты для доступа извне | `pnpm prod:docker` - порты закрыты

Приложение будет доступно по ссылке http://localhost:8080 (PROD)

## Важно

> [!TIP]
> **Для разработки:** Запускайте `web` и `backend` локально, чтобы работал Hot Reload, а базу и redis оставьте в Docker. Nginx в данном случае не нужен. Запустить web - `pnpm dev` запустить backend - `pnpm run start:dev`. Приложение будет доступно по стандартной ссылке для Next.js http://localhost:3000

# Главная страница
![Превью](preview.gif)