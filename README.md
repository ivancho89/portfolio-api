# User's Portfolio

REST API to show a list of users and their basic information (full name, description, image url, twitter username). 

## Requirements

```bash
* Node ^12.*
* npm ^6.1* 
* yarn
* serverless-offline ^2.6.0
```

### Technologies Used

#### Backend

 * The api was built in JS (Node.js) with Express, also using an MVC architecture pattern as base (which use services instead of views )
 * The api was created as lambda with serverless framewrok (also generate ApiGateway, Lambda and Bucket resources on S3)
 * The code was deploy with AWS pipelines (https://3ow4vuqutl.execute-api.us-east-2.amazonaws.com/dev/users)
 * The library used to connect to twitter was Twitter for Node.js (https://www.npmjs.com/package/twitter)
 * Mocha for unit test

#### Frontend
 * The UI was build in react with boostrap
 * The UI was deployed in a S3 bucket (https://user-portfolio-test.s3.us-east-2.amazonaws.com/index.html)

### Database

According the reference, a DynamoDb was created with the folloing fields:

* id (PK)
* full_name
* description
* imgae_url
* twitter_username


### Run locally

Before Run the project be sure to have to create a .env file with the folloing variables

```bash

ACCESS_KEY=<amazon access key>
SECRET_KEY=<amazon secret key>
TWITTER_CONSUMER_KEY=<twitter consumer key>*
TWITTER_CONSUMER_SECRET=<twitter consumer secret>*
TWITTER_ACCESS_KEY=<twitter access key>*
TWITTER_ACCESS_SECRET=<twitter access secret>*

* you'll need to create a developer account for twitter credentials(https://developer.twitter.com/en/apply-for-access)
```
#### Steps 

1. Clone the repository https://github.com/ivancho89/portfolio.git
3. In the console run: `npm install -g serverless-offline` 
2. Go to the project folder and run in the console: `yarn install`
4. After install everything, run `sls offline` (this will allow you to use the lambda in your local on port 3001)
	4.1 If you want to change the port, you can change it in the package.json
5. Go to your browser and type `http://localhost:3000/dev/are-you-alive` (to know if the server is already up and working)


### Run Test

The test validate the basic user cases which are:

1. Create a new user (no validation included)
2. Create same user (validate if the twitter username is duplicated in the DB)
3. Update an existing user
4. Update an invalid user
5. Delete the user creted in tests

In order to run the test, you can run:

1. yarn test 

Remember you should have the .env file with the right values

### Endpoints

The REST API provide the following endpoints

 * POST /users
  Create a new user in the db

  Example of create object

```bash
 {
 	"full_name":"Jhon Doe"
         "image_url": ""
 	"description" :"My description"
 	"twitter_username": "my_username"
 }
```
 * GET /users
   List the users in the db

 * PATCH /users/:userId
   Update an existing user

  Excample of request

 ```bash
/users/asd23-123 
 
 {
 	"full_name":"Jhon Doe"
 	"twitter_username": "my_username"
 }
```

### Total Time

- Building API: 4 Hours
- Building Frontend: 4.5 Hours
- Infrastructure: 4 Hours
- General Testing (Mostly deployments): 2 Hours

### To Improve API

- The way how it's  being use the Dynamo Librari (create inside de modules folder the clasess to manage Dynamo and querys)
- Create a class tanage twitter 
- Add Joi for validatation of fields on requests


### Consideations

- The UI doesn't have validations or show errors
- The UI was build in react wihout to much experience
- The UI use boostrap but is not responsive 
- The knowledge on AWS deployment and infrastucture in general is not to much




