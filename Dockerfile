FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/dist/system-academy-fe/ ./dist/system-academy-fe/

EXPOSE 4000

CMD [ "node", "dist/system-academy-fe/server/server.mjs" ]