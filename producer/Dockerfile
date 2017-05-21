FROM node:latest

RUN mkdir /usr/src/app

RUN npm install nodemon -g

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 3000

CMD node /usr/src/app/index.js
