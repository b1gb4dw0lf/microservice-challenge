FROM node:latest

RUN mkdir /usr/src/app

RUN npm install nodemon -g

WORKDIR /usr/src/app

ADD ./package.json /usr/src/app/

RUN npm install

EXPOSE 3000

CMD nodemon /usr/src/app/producer/index.js
