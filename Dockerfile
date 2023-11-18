FROM node:18-alpine as prod

WORKDIR /app

COPY *.json /app/

COPY . .

RUN apk add --no-cache bash

RUN npm install

CMD [ "npm", "run", "build"]
