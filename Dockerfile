# STAGE 1
FROM node:carbon-alpine as builder

ARG env=prod

WORKDIR /app
COPY package.json package-lock.json  /app/
RUN cd /app && npm install
COPY .  /app

RUN cd /app && npm run build --env=$env

# STAGE 2
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

