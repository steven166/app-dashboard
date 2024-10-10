FROM node:20-alpine
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN ./node_modules/.bin/ng build

FROM nginx:1.27.2-alpine
EXPOSE 8080
WORKDIR /usr/share/nginx
VOLUME /usr/share/nginx/html/assets/config

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist /usr/share/nginx/html
