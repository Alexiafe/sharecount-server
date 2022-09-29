# Sharecount PWA App - Server

## Description
Sharecount is the solution for organizing group expenses on the web or mobile.<br>

The is the app's server-side code in Typescript.


## Built With
- [Nest](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)


## Installation
```bash
$ npm install
```


## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger
[Swagger](http://localhost:3000/api/)

## Prisma
```bash
# Setup a new Prisma project
$ npx prisma init

# Generate artifacts (e.g. Prisma Client)
$ npx prisma generate

# Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ npx prisma migrate dev

# Seed the database
$ npx prisma db seed

# Pull the schema from an existing database, updating the Prisma schema
$ npx prisma db pull

# Push the Prisma schema state to the database
$ npx prisma db push
```

## Load local data to Heroku
# Make a backup
docker exec postgres pg_dump -U admin database > backup.sql
docker exec [container-name] pg_dump -U [user] [password] > [file-name].sql
 
# Load the sql file to the server
heroku pg:psql --app sharecount-api < ./backup.sql
heroku pg:psql --app [app-name] < ./[file-name].sql
