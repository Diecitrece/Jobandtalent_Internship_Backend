## A-team-project for job&talent/devaway

This project has been created to help people find the best job ever.

Installation:

- Clone the repository with:
  `git clone https://github.com/juanfril/A-team-project.git`\
- Start docker project with:
  `docker-compose up`
- Open a terminal inside the project with:
  `docker-compose exec app sh`
- Install dependecies with:
  `yarn install`
- You can insert some data for testing using:
  `yarn makeSeeds` </br>
The terminal ask you how many users you want create, just type a number you want
- You can call differents endpoints:
  - Show all users
  `http://localhost:8080/api/users`
  
If you get some errors when you run the docker-compose, pay attention with:
-  Postgres image uses the port 5430
-  App image uses the port 8080
