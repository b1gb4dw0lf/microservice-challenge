FROM node:latest

RUN mkdir /usr/src/app

RUN npm install nodemon -g

WORKDIR /usr/src/app

ADD ./package.json /usr/src/app/

RUN npm install

CMD nodemon /usr/src/app/consumers/crypto/index.js
