FROM node:18-alpine as prod

WORKDIR /app

COPY *.json /app/

COPY . .

RUN npm install

CMD [ "npm", "start" ]