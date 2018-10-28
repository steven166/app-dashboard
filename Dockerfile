FROM node:10.12.0-alpine
WORKDIR /app

COPY package.json .
RUN yarn --frozen-lockfile

COPY . .
RUN ./node_modules/.bin/ng build --prod

FROM nginx:1.15.5-alpine
EXPOSE 8080
WORKDIR /usr/share/nginx
VOLUME /usr/share/nginx/html/assets/config

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist /usr/share/nginx/html
