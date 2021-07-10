# Api Docs

> BASE_URL : https://cake_api.herokuapp.com/api/

> [Link to the API documentation](https://documenter.getpostman.com/view/4448465/Tzm6ncKU)


# Endpoints Summary

| Verb | Route | Description | Auth Required |
|------|-------|-------------|---------------|
|   GET   |  `/`      |   Index Route          |   false            |
|   POST   |  `/cakes`      |    Create  cake         |      false         |
|   PUT   |   `/cakes/{id}`    |    Update cake         |      false        |
|   GET   |   `/cakes` |        Get list of cakes        |    false           |
|   GET   |  `/cakes/{id}`      | Get single cake            |    false           |
|   DELETE   |  `/cakes/{id}`     |   Delete cake         |   false           |
            

# Usage  
## Requirements
  > Node installed

  > NPM or Yarn install

  ## Steps
  - `git clone https://github.com/nedssoft/cake-crud.git && cd cake-crud`
  - `touch .env && cp .env.example .env`
  - `npm install`
  - `npm run migrate`
  - `npm run dev`

## Test
To run the automated test, run the following command

> npm test


# Languages
- Node
- TypeScript

# Framework/libraries
- [Express](https://expressjs.com/) 
- [Sequelize ORM](https://sequelize.org/)/[node postgress](https://www.npmjs.com/package/pg) for database client
- [Express validator](http://exss-validator.github.io/docs)  for validation
- [Sequelize TypeScript](https://www.npmjs.com/package/sequelize-typescript)

# Test libraries
- [Jest](https://jestjs.io/docs)
- [Supertest](https://www.npmjs.com/package/supertest)

# Tools
- [Eslint]() for style guide and linting
- [SQLite3]()
- [Coveralls]() for coverage test.
- [Heroku](https://heroku.com/) for hosting

# Licence
- MIT 
