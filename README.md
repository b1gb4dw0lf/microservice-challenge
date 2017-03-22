# EMLAK-JET Challenge

## Description

This is the repo for the emlak-jet challenge and the applications in this repo is not meant for production. Also be aware that this repo solves imaginary scalability issues in order to complete the task.

## Repo Content

This repo contains 4 dockerized microservices:

-  API: API is the entry point of this distributed system. It's main duty is to route requests to corresponding services and return the response to the requesting user. This service will also be the last place where authentication and input validation is handled.

- Badge: Badge system is to handle all requests about badges. (Get, Create, Update, Delete). Badge assigning to a user is out of the scope of this microservice.

-  User: User service is the place where all operations about the user is handled. Badge assigning job is also the job of this service.

- Crypto: Crypto service is where passwords are hashed, compared and salts are generated.

Additional Containers:
For easier deployment docker containers are used. Additional containers exist to address rabbitmq, mongo and nginx dependencies.

# Usage:

This is a todo section:

- Note to self don't forget to add api.localhost to /etc/hosts
