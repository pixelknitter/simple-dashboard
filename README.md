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
     1. Update your `.env` to instead point to:
     ```bash
     DATABASE_URL="file:./dev.db"
     ```
     1. Delete `./prisma/migrations`
     2. Run `prisma migrate dev --name init` to initialize the local DB - this should create a `./prisma/dev.db` if one doesn't exist
     3. You can see the database by running `yarn prisma seed`
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

## What went well?

- Enjoyed trying out some new technologies and organizing the code
- Made use of generics
- Converted the test data for graph into an API as well
- Setup a local Postgres instance for deployment

# Take home test

This project serves as the starting point for the 'take home' evaluation. You will have a week to complete this project. The due date isn't completely set in stone. If you need another day or two that's not an issue. If you have any questions feel free to reach out.

## Getting started

You will be updating this project to complete two 'features'. The main files you need to edit are `pages/index.tsx`, `pages/api/post.ts`, `pages/graph.tsx` and `pages/notes.tsx`. Feel free to change other files though. After you are done zip the project and send it back to us.

## Goals

### Page: Graph

Create a page that displays the provided `testData` in a line graph. The line graph's x-axis and y-axis should be `timestamp` by `fps` respectively. Each distinct `user` should get its own line. Hovering a data point should reveal a tooltip that displays all of that data-point's properties.

### Page: Notes

Create a page that allows users to read, delete, and create 'posts'. Posts should be made of two properties, `author` and `body`. These posts should be saved in a database. Display these notes in a 'feed'. Think Facebook or Twitter. Don't worry about user login or anything like that. Author can just be a free form field.

The API should follow standard `REST` practices.

### General: Design

The site should feel a bit more 'completed' than just raw html forms. Clearly the content of this site wont look like a cohesive product, but you should make an effort to give the site a proper layout.

### Deployment

Host your completed work somewhere that you can link to.

## Things you will be evaluated on.

- General code quality (should be easy to read)
- Completeness of page features. Complete as much as you can.
- Consider edge cases. For example, submitting an empty form shouldn't be allowed.
- User experience. You don't need to be a UX/Design pro, but the site should be trivial to use, and feel like a modern-ish app.

## Suggestions

Using these libraries/tools doesn't give you any extra points. Feel free to use what's comfortable to you. This list is provided to help you out if you aren't sure where to start.

- Vercel (site hosting)
- Prisma (ORM for database connections. Prisma Cloud for database hosting.)
- MUI (design system)
- react-hook-form (form state management)
- zod (schema validation)
- SWR (promise state management)
- chart.js / react-chartjs-2 (chart drawing)
