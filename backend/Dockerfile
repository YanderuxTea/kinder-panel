FROM node:25

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY prisma ./prisma/

RUN pnpm install

RUN pnpm prisma generate

COPY . .

EXPOSE 4000