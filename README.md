# ws-node-demo
#### A NodeJs application written in TypeScript using ExpressJs, Mongoose, and tsoa to stand up the Swagger UI.

## Prominent Libraries used:
- [Express](https://expressjs.com)
- [mongoose](http://mongoosejs.com/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [tsoa](https://github.com/lukeautry/tsoa)

## Architecture:
The article [Swagger, NodeJS, & TypeScript : TSOA](https://medium.com/@will.streeter/swagger-nodejs-typescript-tsoa-15a3f10fabaf),
has a deeper review of how this application is constructed.
This back-end application is a part of a larger effort to demonstrate the principals of web development expressed
in the article [Practical Web Development and Architecture](https://medium.com/@will.streeter/practical-web-development-and-architecture-26a37d04c10f).
Advocating the principal **"a separation of concerns"**, thin controllers residing in the **"service-layer"**
retain the singular purpose of acting as filters for API request. Controllers exist to support results of data processing
logic derived in outside layers of concern.  Maximizing the opportunity for application growth, without extensive refactoring,
the processing of business rules  and cross-cutting concerns are placed in the  **"business-layer"**, while
database adapters, formalized data base queries, and services used to abstract those queries are stationed in the **"data-layer"**.
As much as possible the controllers duties are focused on directing request to outside resources and responding to results from those
resource with simple conditional logic.

Another aspect  emphasized in the  [Practical Web Development and Architecture](https://medium.com/@will.streeter/practical-web-development-and-architecture-26a37d04c10f) article
is the importance of adopting strategies to support optimal output from a development team. To this end
[tsoa](https://github.com/lukeautry/tsoa), a Swagger UI creation tool, is used to demonstrate an innovative means of
generating an API testing portal and documentation based on a few simple structural requirements. The Swagger scaffolding
resides in the **"presentation-layer"** .

[ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example) : is the repository used to bundle this
application along with three other submodules. Docker compose is used to orchestrate the development of a **FullStack**.
Those submodules are located in the GitHub repositories listed below.

+ **(this repo)** [ws-node-demo](https://github.com/WillStreeter/ws-node-demo)
+ [ws-mongo-demo](https://github.com/WillStreeter/ws-mongo-demo)
+ [ws-nginx-demo](https://github.com/WillStreeter/ws-nginx-demo)
+ [ws-ngx-login-demo](https://github.com/WillStreeter/ws-ngx-login-demo)

How these containers are used as a bundle to facilitate a **FullStack** approach for developing with Docker is delineated in the article,
[Docker is my {I.D.E}](https://medium.com/@will.streeter/docker-is-my-i-d-e-d6dc84cca26d)

**It should be noted that this application is created for the purposes of demonstrating a development paradigm, not as a production
ready seed.**

Although the application is best understood as a part of the larger overall effort demonstrated with the
[ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example), it can still be cloned and stood up
without the use of the Docker bundle. To use this application as a separate standalone entity, use the
**[local-client](https://github.com/WillStreeter/ws-node-demo/tree/local-client)** branch.


### Ways to construct this application with or without Docker

1. Using the FullStack( **This NodeJs app**, Mongo, NGINX, Angular app ) approach with an integrated Docker environment.

   + Go to the  [ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example) repo and follow the README.md


2. Using Docker to stand up the application with a dependency of Mongo

  ```$> git clone https://github.com/WillStreeter/ws-node-demo.git

     $> git fetch

     $> git checkout origin/serverless

     $> docker-compose up

  ```
   + [Swagger UI API tester  **http://localhost:8080/docs**](http://localhost:8080/docs)


3. BareMetal (Installing libraries and running it on your machine's OS)

   + Install MongoDB on your machine.
     + [MongoDB OS X Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
     + [MongoDB Windows Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


  ```$> git clone https://github.com/WillStreeter/ws-node-demo.git

     $> git fetch

     $> git checkout origin/local-client

     $> npm install
  ```

   Befor running the application, you will need to update the src/data-layer/adapters/MongooseAccess.ts file by switching commented outline
   21 and 22.

  from

  ```
   //let connectionString =   config.get('mongo.urlClient').toString();
    let connectionString = config.get('mongo.urlDocker').toString();
  ```

  to

  ```
     let connectionString =   config.get('mongo.urlClient').toString();
    //let connectionString = config.get('mongo.urlDocker').toString();
  ```

Making this change will switch the host from ws-mongo-demo to 127.0.0.1 (localhost). These variables are set in the config/default.yaml


  ```
     $> npm run start
  ```

   + [Swagger UI API tester  **http://localhost:8080/docs**](http://localhost:8080/docs)



### Here are some examples of object types to insert an incorrect user and a correct user

  ```incorrect user

    {
      "username": "tao",
      "password": "1234",
      "firstname": "zip",
      "lastname": "zap",
      "email": "zip-zap@ez.com",
      "admin": false,
      "isLoggedIn": false
    }


    correct user
    {
      "username": "taosing",
      "password": "password",
      "firstname": "fifty",
      "lastname": "cents",
      "email": "zip-zap@ez.com",
      "admin": false,
      "isLoggedIn": false
    }
  ```