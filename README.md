# EMLAK-JET Challenge

## Description

This is the repo for the emlak-jet challenge and the applications in this repo is not meant for production. Also be aware that this repo solves imaginary scalability issues in order to complete the task.

## Repo Content

This repo contains 4 dockerized microservices:

-  API: API is the entry point of this distributed system. It's main duty is to route requests to corresponding services and return the response to the requesting user. This service will also be the last place where authentication and input validation is handled.

- Badge: Badge system is to handle all requests about badges. (Get, Create, Update, Delete). Badge assigning to a user is out of the scope of this microservice.

-  User: User service is the place where all operations about the user is handled. Badge assigning job is also the job of this service.

- Crypto: Crypto service is where passwords are hashed, compared and salts are generated.

- Logger: Logger service logs the movements of the user scrolls, clicks etc.

Additional Containers:
For easier deployment docker containers are used. Additional containers exist to address rabbitmq, mongo and nginx dependencies.

# Usage:

This is a todo section:
Currently there is an issue with docker that proper fix would delay the project further
Therefore docker+hack steps are below:

First Need to build Frontend.
- cd into frontend
- npm install
- npm run build

Then
- npm install all consumers + producer paths.

Finally, gently type
- docker-compose build
- docker-compose up

At first nodejs services will fail, DON'T PANIC! Because the issue is about
container startup order to bypass that problem services are running with nodemon.
Open up producer folder and index.js after you are sure that rabbitmq and mongo is
running use cmd + s combo to trigger nodemon.

If everything is worked fine. App should be available at localhost.
By the way this app uses port 80 therefore nginx or apache should be off or configured
to use another port.

# What Is NOT Done:
- Friend invitations are not available.
- Docker container orchestration
