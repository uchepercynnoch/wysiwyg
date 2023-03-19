# WYSIWYG

- [Introduction](#intro)
- [Instructions](#instructions)
- [Requirements](#requirements)
- [Build](#build)
- [Run](#run)
- [Known Issues](#issues)

## <a id="intro">Introduction</a>

Simple stateless microservice in Nodejs, with three major functionalities

- Authentication
- JSON patching
- Image Thumbnail Generation

## Instructions

First clone the repository, unzip, and open in your favourite IDE. Create files `.env` and `docker.env` for your
configurations. File contents should look like so:

```
### This block is for .env file ###
DB_DEV_URL=mongodb://localhost/dev_db
DB_PROD_URL=mongodb://localhost/prod_db
DB_TEST_URL=mongodb://localhost/test_db
### This block is for .env file ###

### This block is for docker.env file ###
DB_DEV_URL=mongodb://mongo/dev_db
DB_PROD_URL=mongodb://mongo/prod_db
DB_TEST_URL=mongodb://mongo/test_db
### This block is for docker.env file ###

PORT=5000
JWT_KEY=<your jwt key>
JWT_EXPIRY=<your jwt expiry date>

NODE_ENV=<environment>

API_ROOT=/api/v1
```

The application runs different services as docker containers, so be sure to have __Docker__ installed globally on your
PC. See
instructions on how to install for [Mac](https://docs.docker.com/desktop/mac/install/)
and [Windows](https://docs.docker.com/desktop/windows/install/). _Docker-Compose_ is used to orchestrate the service's
containerization.

### <a id="build">Build</a>

To build the application, open a terminal in the root directory of the application, then run the
command `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build` or `./docker.sh`.
Where `docker.sh` bash file in the root directory of the application. Be sure to grant the file executable permissions
e.g., on __MAC__, run `chmod +x docker.sh`. This will generate a docker image.

### <a id="run">Run</a>

To the run the application, open a terminal on the application root directory:

- As a monolith - run `npm start`
- As a microservice - run `docker-compose up`

### <a id="issues">Known Issues</a>

For some reason, image thumbnail generation on node.js alpine version does not seem to work in docker image. So full
version of node.js should be used instead.
I used alpine version to reduce image build size.
