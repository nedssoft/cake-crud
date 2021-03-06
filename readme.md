
[![Build Status](https://travis-ci.com/nedssoft/cake-crud.svg?branch=main)](https://travis-ci.com/nedssoft/cake-crud) [![Coverage Status](https://coveralls.io/repos/github/nedssoft/cake-crud/badge.svg?branch=main)](https://coveralls.io/github/nedssoft/cake-crud?branch=main)
# Api Docs

## BASE_URL  (Heroku): 

https://cake-apii.herokuapp.com/api

## BASE_URL (AWS): 

http://cake-crud.eba-yu8kuexs.eu-west-2.elasticbeanstalk.com/api


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
- [SQLite3]() For testing
- [ElephantSQL](https://api.elephantsql.com/) For prod
- [Coveralls]() for coverage test.
- [Heroku](https://heroku.com/) for hosting



## AWS Deployment pipeline screenshot
![image](https://user-images.githubusercontent.com/31114577/125196521-363b8c80-e252-11eb-8dcf-71633ba1c538.png)

# Licence
- MIT 
