## A-team-project for job&talent/devaway

[![CI/CD Pipeline](https://github.com/juanfril/A-team-project/actions/workflows/workflow.yml/badge.svg?branch=main)](https://github.com/juanfril/A-team-project/actions/workflows/workflow.yml)

This project has been created to help people find the best job ever.

Installation:

- Clone the repository with:
  `git clone https://github.com/juanfril/A-team-project.git`\
- Install dependecies with:
  `yarn install`
- Start docker project with:
  `docker-compose up`
- Open a terminal inside the project with:
  `docker-compose exec app sh`
- You can insert some data for testing using:
  `yarn makeSeeds` </br>
  The terminal will ask you how many users you want to create, just type a number you want
- You can call differents endpoints:
  - Home page to check the connection
    `http://localhost:80/`

If you get some errors when you run the docker-compose, pay attention with:

- Postgres image uses the port 5432
- App image uses the port 8080
- .env variables have the required values

You can find the deployed project at: http://ec2-52-59-191-81.eu-central-1.compute.amazonaws.com/

### Methods:

---

Get all users (Token required): <br/>
http://ec2-52-59-191-81.eu-central-1.compute.amazonaws.com//api/users<br/>
Method: 'GET'

---

Get one user (Token required): <br/>
http://ec2-52-59-191-81.eu-central-1.compute.amazonaws.com//api/users/:id<br/>
 - Where ':id' is the ID of whichever user you are searching for.<br/>
Method: 'GET'
---

Body to add one user:<br/>
http://ec2-52-59-191-81.eu-central-1.compute.amazonaws.com//api/users<br/>
Method: 'POST'

```
{
  "firstName": "someone",
  "surNames": "onesurname",
  "email": "example@gmail.com",
  "password": "DSdasjfl5467kdsjafs",
  "phone": "666111222",
  "address": "Some address, 5"
}
```

Your output should be something like that:

```
  [
	{
		"id": "a66fd6fb-b86c-49e2-8dad-f01ba51b41c4",
		"firstName": "someone",
		"surNames": "onesurname",
		"email": "example@gmail.com",
		"password": "$2b$10$C5NviK3U2bcdzCyDwJ9zseUoq7vhoZQMocprinB/4OOJDnIxklwem",
		"phone": "666111222",
		"address": "Some address, 5",
		"created_at": "2022-04-29T09:16:59.974Z",
		"updated_at": "2022-04-29T09:16:59.974Z"
	}
]
```

---

Body to login user:
http://ec2-52-59-191-81.eu-central-1.compute.amazonaws.com//api/users/login<br/>
Method: 'POST'

```
{
  "email": "example@gmail.com",
  "password": "DSdasjfl5467kdsjafs",
}
```

In your output, you can see a token:

```
  {
	  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGRyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiM2VkUTJXIiwiaWF0IjoxNjUxNTcwNTI4LCJleHAiOjE2NTE1NzA1NjN9.vTCQGPs2IQ9zFHu2H2pczR6oPiKvMSxS459YmtaCM5Q"
  }
```

With this token you can access to 'getAllUsers' and 'getOneUser' endpoints. The token will expire after 35 seconds.

### Enjoy 😇
