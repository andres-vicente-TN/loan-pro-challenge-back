# Loan Pro Challenge API

This workspace uses [Nx, a Smart, fast and extensible build system.](https://nx.dev) Make sure to install [recommended VSCode extensions](.vscode/extensions.json).

## Setup

1. Make sure that you are using the [right version of Node](.nvmrc): `nvm use`
2. Install dependencies: `npm i`

## Installation

```bash
$ npm install
```

## Set DATABASE_URL

```bash
$ cp .env.template .env
```

## Start local database

```bash
$ docker compose up
```

## Init database

```bash
$ npx prisma db push
$ npx prisma db seed
```

## Running the app

```bash
$ npm run start
```

## API Documentation

http://localhost:3000/api

## Unit Test

```bash
$ npm run test
```
