[![Deploy with Vercel](https://vercel.com/button)](https://api.vercel.com/v1/integrations/deploy/prj_ASo9qBeQydZhFyPfc3JY1ACf5VRX/64A278RrGp)

# Setup

1. Setup your database locally with two options:
   - **PostGRES**
     1. Install `postgres` [locally](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/) and use the username/password in `DATABASE_URL` provider in `.env`, these should be used for connection:
     ```
     host: localhost
     port: 5432
     username: local
     password: password
     ```
     2. Launch the local PostGRES and use the provided `.env`
   - **SQLite**
     1. Swap out your `datasource` in `schema.prisma`:
     ```prisma
       datasource db {
         provider = "sqlite"
         url      = env("DATABASE_URL")
       }
     ```
     2. Update your `.env` to instead point to:
     ```bash
     DATABASE_URL="file:./dev.db"
     ```
     3. Delete `./prisma/migrations`
     4. Run `prisma migrate dev --name init` to initialize the local DB - this should create a `./prisma/dev.db` if one doesn't exist
     5. You can see the database by running `yarn prisma seed`
2. Run locally: `yarn dev`

# Retrospective

## What could be improved?

- ran into issues with types and generation artifacts from schema to `zod` validation resolvers
- the graph has a simple interface that could be improved with a more readable x-axis labeling
- the notes page could include more styling clean up to improve the negative space
- the `Layout` component added more white space than originally intended. Didn't bother to dig into this for now.
- configuring the Heroku Postgres instance was an extra step that required additional testing. Next time, I'd start with setting that up.
- improve the loading states - they're pretty basic
- ended up skipping tests - could configure them to run when deployment
- add `husky` git hooks to prevent deployment of TypeErrors
- add import aliases to clean up the import paths in files
- graph could look better on mobile (currently flattens)
- improve the UX of the timestamps (date/time formatting) - originally had issues with the chart library where it shifted the values if I modified the labels

## What went well?

- Enjoyed trying out some new technologies and organizing the code
- Made use of generics
- Converted the test data for graph into an API as well
- Setup a local Postgres instance for deployment
