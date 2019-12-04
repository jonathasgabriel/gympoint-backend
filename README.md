# gympoint-backend
A complete Gym management application that enables registered customers to check in the gym and submit help orders through a react-native mobile App. Gym administrators have a reactjs web application for managing customers, enrollments, plans, and help orders.

This backend is implemented in  **Node.js** and provides a REST API for the features available in GymPoint. The frontend reactjs client consumig this API is available at [gympoint-frontend](https://github.com/jonathasgabriel/gympoint-frontend) and is used by gym administrators only. The react-native mobile application is used by customers and is available at [gympoint-mobile](https://github.com/jonathasgabriel/gympoint-mobile).

## features
- For gym administrators only:
    - User authentication (JWT token)
    - Customer creation/edition/deletion
    - Plan creation/edition/deletion
    - Enrollment creation/edition/deletion
    - Help order answer
- For customers only:
    - Gym checkin (up to 5 times in a 7 days window)
    - Help order creation
    - Email notification regarding new enrollments and answered help orders

## some of the leveraged techs/libs/tools
- Nodemon / Sucrase
- ESLint, Prettier, EditorConfig
- Docker
- Sequelize
- Express
- Nodemailer
- Yup
- Bee-queue jobs
- Postgres
- Mongo db
- Redis

## how to run

- You need to have running instances of mongodb, postgres and redis (optional for mailing customers). Below docker commands will get your instances up and running from scratch (you must have [docker](https://docs.docker.com/install/) installed on your machine):
    - docker run --name postgres-database-dev -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
    - docker run --name mongo-database-dev -p 27017:27017 -d -t mongo
    - docker run --name redis-database-dev -p 6379:6379 -d -t redis:alpine
- Please configure the `.env.example` file in the root directory with your corresponding information
- Run `yarn sequelize db:migrate` in the root directory to run database migrations
- Run `yarn sequelize db:seed:all` in the root directory to create an initial admin user for the application( user: admin@gympoint.com / pass: 123456)
- In the root directory, run `yarn` to resolve node packages and then `yarn dev` to start the application (open a new terminal window in the root directory and run `yarn queue` in parallel to start the mailing queue)
