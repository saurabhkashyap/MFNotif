# MFNotif
Notification Service

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependency packages
```npm
npm install
```
## Environment Setup
Create `.env` file with below environment variables
```dotenv
NODE_ENV = 'development'
NODE_SERVER_HOST = 0.0.0.0
NODE_SERVER_PORT = 1234

# JWT
JWT_ISSUER = ''

# Sequelize
SEQUELIZE_DB_NAME = ''
SEQUELIZE_DB_DIALECT = 'mysql'
SEQUELIZE_DB_HOST = ''
SEQUELIZE_DB_PORT = 3306
SEQUELIZE_DB_USERNAME = ''
SEQUELIZE_DB_PASSWORD = ''

# Redis
REDIS_HOST = ''
REDIS_PORT = ''
REDIS_PASSWORD = ''

# Twilio
TWILIO_ACCOUNT_SID = ''
TWILIO_AUTH_TOKEN = ''
TWILIO_NUMBER = '+'
TWILIO_WHATSAPP_NUMBER = ''

# SendGrid
SENDGRID_API_KEY = ''
SENDGRID_SENDER_EMAIL = ''
```

## Code Overview

### Dependencies
 - [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables 
 from a .env file into process.env .
 - [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
 - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating JWTs used by authentication
 - [sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, 
 MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, 
 read replication and more.
 - [lodash](https://www.npmjs.com/package/lodash) - A modern JavaScript utility library delivering modularity, 
 performance & extras.
 - [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
 - [moment](https://www.npmjs.com/package/moment) - A lightweight JavaScript date library for parsing, validating, 
 manipulating, and formatting dates.
 - [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports 
 prepared statements, non-utf8 encodings, binary log protocol, compression, ssl.
 - [twilio](https://www.npmjs.com/package/twilio) - Node.js Library for Twilio API
 - [@sendgrid/mail]() - This is a dedicated service for interaction with the mail endpoint of the SendGrid v3 API.
 - [bull](https://www.npmjs.com/package/bull) - The fastest, most reliable, Redis-based queue for Node. Carefully 
 written for rock solid stability and atomicity.
 - [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware 
 that can be used to enable CORS with various options.
 - [md5](https://www.npmjs.com/package/md5) - a JavaScript function for hashing messages with MD5.
 - [node-uuid](https://www.npmjs.com/package/uuid) - For the creation of Universal Unique IDs
 
### Application Structure
 - `.env` - This file contains all environment variables
 - `index.js` - The entry point to the Application.
 - `server.js` - This file defines our express server and connects it to Mysql using sequelize ORM. It also requires 
 the routes we'll be using in the application.
 - `config/` - This folder contains configuration for application, express server and databases.
 - `handlers/` - This folder contains all API Route handlers, Query handlers. Application business logic available in
  these handlers.
 - `middlewares/` - This folder contains application middlewares. 
 - `queues/` - This folder contains queues that are used in application.
 - `routes/` - This folder contains the route definitions for our API.
 - `utils/` - This folder contains the all third party clients, constants, support files
 - `sequelize/models/` - This folder contains the schema definitions for our Sequelize models.
 
### Error Handling
in `middlewares/catch-errors.js`, I defined a error handling middleware for handling API Validation Errors. 
This middleware will respond with 500 status code by default(if error status code not exists) to have error messages 
the client can understand. and `config/app-config` handles if any `unhandledRejection`'s was there in the application.

### Authentication
Requests are authenticated using the Authorization header with a valid JWT. I defined a express middleware 
for validating the jwt token in `middlewares/jwt.js` file. It will return a 401 status code if the request 
cannot be authenticated. The payload of the JWT can then be accessed from req.headers.payload in the endpoint.

### Running Application
For running application use
```npm
npm start
```
Server will listen on PORT specified on `.env` file or `3000` by defauld.