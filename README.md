# Udacity: Build a Storefront Backend

## Contents:

1-Description.

2-Project build depended on.

3-Project Structure.

4-How To Use.

5-Functionality and Endpoints.

6-Development.

## Description:

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Project build depended on

- The language used and application logic

1. [TypeScript] (https://www.typescriptlang.org/docs/)
2. [Node.JS] (https://nodejs.org/dist/latest-v16.x/docs/api/)
3. [Express] (https://expressjs.com/)

- For managing environment variables

1. [dotenv] (https://www.npmjs.com/package/dotenv)

- For the database and migration

1. [pg] (https://node-postgres.com/)
2. [db-migrate] (https://db-migrate.readthedocs.io/en/latest/)
3. [db-migrate-pg] (https://www.npmjs.com/package/db-migrate-pg)

- For authentication and security

1. [jsonwebtoken] (https://www.npmjs.com/package/jsonwebtoken)
2. [bcrypt] (https://www.npmjs.com/package/bcrypt)
3. [morgan] (https://www.npmjs.com/package/morgan)
4. [helmet] (https://www.npmjs.com/package/helmet)

- For Fixing and Formatting Code

1. [ESLint] (https://eslint.org/docs/user-guide/getting-started)
2. [Prettier] (https://prettier.io/docs/en/index.html)

- For Unit testing

1. [Jasmine] (https://jasmine.github.io/)
2. [supertest] (https://www.npmjs.com/package/supertest)

## Project Structure

```
migrations
    sqls
        20220326180310-users-table-down.sql
        20220326180310-users-table-up.sql
        20220326180329-products-table-down.sql
        20220326180329-products-table-up.sql
        20220326180346-orders-table-down.sql
        20220326180346-orders-table-up.sql
    20220326180310-users-table.js
    20220326180329-products-table.js
    20220326180346-orders-table.js
node_modules
spec
    support
        jasmine.json
src
    controller
        orders.controller.ts
        products.controller.ts
        users.controller.ts
    database
        database.ts
    middleware
        authentication.middleware.ts
        emailValidator.middleware.ts
    model
        orders.model.ts
        product.model.ts
        user.model.ts
    routes
        api
            orders.routes.ts
            products.routes.ts
            users.routes.ts
        main.routes.ts
    tests
        helpers
            reporter.ts
        order.model.spec.ts
        product.model.spec.ts
        routes.spec.ts
        server.Spec.ts
        user.model.spec.ts
    types
        order.types.ts
        product.types.ts
        user.types.ts
    server.ts
.dockerignore
.gitignore
.eslintrc.js
.prettierignore
.prettierrrc
CODEOWNERS
database.json
docker-compose.yml
Dockerfile
LICENSE.txt
package-lock.json
pachage.json
README.md
REQUIREMENTS.md
tsconfig.json

```

## How To Use:

### Create Databases

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER store_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c store`
    - `GRANT ALL PRIVILEGES ON DATABASE store TO store_user;`
  - Grant for test database
    - `\c store_test`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`npm run migrateUp`

### Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.

```
PORT= 3000
NODE_ENV=dev
POSTGRES_DATABASE=store
POSTGRES_TEST_DATABASE=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
BCRYPT_PASSWORD=more-safe
SALT_ROUNDS=10
SECRET_TOKEN=more-security

```

### NPM Scripts

to build the project and use it do the following orders in terminal:

- To install required packages: `npm install`

- To create the tables of database by migrate: `db-migrate up` or `npm run migrateUp`

- to drop tables: `db-migrate up`

- to run test: `npm run test`

- to start project development: `npm run dev`

- to run and start the project: `npm run start`

- to run Prettier and ESLint: `npm run format`

## Functionality and Endpoints

- Homepage Endpoint
  `http://localhost:3000/`
- User CRUD API EndPoints
  Post - create user
  `/api/users`
  Get - get all users
  `/api/users`
  Get - get specified user
  `/api/users/:id`
  Patch - update specified user
  `/api/users/:id`
  Delete - delete specified user
  `/api/users/:id`
  Post - authentication
  `/api/users/authenticate`
- Product CRUD API End Points
  Post - create product
  `/api/products`
  Get - get all products
  `/api/products`
  Get - get specified product
  `/api/products/:id`
  Patch - update specified product
  `/api/products/:id`
  Delete - delete specified product
  `/api/products/:id`
- Orders CRUD API End Points
  Post - create order
  `/api/orders`
  Get - get all orders
  `/api/orders/:user_id/all_orders/`
  Get - get active orders for specified user
  `/api/orders/:user_id/active/`
  Get - get complete orders for specified user
  `/api/orders/:user_id/complete/`
  Patch - update specified order
  `/api/orders/:user_id`
  Delete - delete specified order
  `/api/orders/:user_id`

## Development:

- Mohamed Nassar
