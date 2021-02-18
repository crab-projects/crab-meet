# when-2-not-meet

A progressive web app that revolutionizes scheduling.

## Setup Guide
The following steps should get you from 0 setup to being able to run and develop the code in this repo.

### Install Node and PostgreSQL
1. Node: https://nodejs.org/en/
2. PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

### Create an environment variable for connecting to the database
1. Create a `.env` file in the root directory.
2. Go to our heroku database dashboard (or create your own) and retrieve the url within credentials
   - https://data.heroku.com/datastores/9652aa72-765f-4f82-a8ba-452a447b7c03#administration
3. Create a variable for the database url
    `DATABASE_URL=DATABASE URL GOES HERE`

### Install dependencies
Just the commands (from root directory):
```
npm install
cd frontend && npm install && cd ..
```

1. Run `npm install` in the root directory.
2. Run `npm install` in the frontend directory.

### Build and run
Just the commands (from root directory):
```
cd frontend && npm run-script build
cd .. && npm run dev
```

1. Build the frontend by running `npm run-script build` in the frontend directory.
2. Start the backend with hot-reloading by running `npm run dev`.