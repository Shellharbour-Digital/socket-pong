FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN npm install

USER node

CMD [ "npm", "start"]

EXPOSE 3000