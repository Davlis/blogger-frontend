FROM node:carbon-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

RUN npm run start
