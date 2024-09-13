# README

[![Test](https://github.com/michellemtchai/streamify-dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/michellemtchai/streamify-dashboard/actions/workflows/main.yml)

## Requirement

You will need [`Docker`](https://www.docker.com/) to run this app.

## Running this app

First, you will need to create an `.env` so that `Docker` knows where to look for its `docker-compose.yml` file. In order to do that, run the following:

```
cp ./docker/dev.env .env
```

Then, you need to run the following to get the server and the database running:

```
docker-compose up
```

You can access the app on your browser via the following url:

```
http://localhost:3000
```
