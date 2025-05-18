## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

Copy the .env.example to a .env file and complete with your environment values

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Create network so database and app can communicate

```
docker network create data-ingest-network
```

## Create and run docker images for database and application

```
docker compose up -d
```

That will build the database and the app images, and will automatically run in production mode.

Also to test the app, you could start the database service from the docker compose, or connect to a local instance of mongo db.

The data ingest will be done every day at midnight with a cron job. For testing puposes, an endpoint was made available to run it on demand.

Documentation available after app is running:
http://localhost:3000/docs

## Endpoints

```
POST /api/v1/data-ingest
```

Start data inges process

```
POST /api/v1/data-query
```

Enable data filtering by any field.

Notes about search:
It is possible to search properties by id, city, country, availability, priceSegment, or price per night range.
Also it is possible to search for a property name that will be case and diacritic insensitive.
