# Auth and Auth (authnauth)

This app demonstrates the auth process which is built using the MERN stack. Additionaly the app is containerised using Docker.

## Authentication and Authorization

Authentication is the process of verifying who someone is.
Authorization is the process of verifying what resources a user has access to. This can by achieved through JWT. JWT uses authorization headers.

JWT stands for JSON Web Tokens

- Handle authentication
- Allow access to API end points
- End points provide data resources

## Getting Started

### Install dependencies

```
cd demo-app
npm i
```

```
cd node
npm i
```

### Setting environment variables for backend (node.js)

Create a file with a name `.env` and copy, paste the following,

```
DATABASE_URI=`YOUR_DB_URI`
ACCESS_TOKEN_SECRET=`A_STRING_OF_YOUR_CHOICE`
REFRESH_TOKEN_SECRET=`A_STRING_OF_YOUR_CHOICE`
```

For `DATABASE_URI`, create a new cluster from your Atlas dashboard.

### To start ./demo-app

```
cd demo-app
npm run start
```

### To start ./node in dev mode

```
cd node
npm run dev
```

### Docker

#### Using Docker Compose

```
docker compose build
docker compose up
```

### Reference

1. [Docker CLI Cheat Sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
2. [Full MERN Stack App: 0 to deployment on Kubernetes — part 1](https://medium.com/@kavinduchamiran/full-mern-stack-app-0-to-deployment-on-kubernetes-part-1-e2f2a3e2fd99)
3. [MERN Stack with Kubernetes](https://blog.carbonteq.com/mern-stack-with-kubernetes/)
4. [YAML Cheatsheet](https://lzone.de/cheat-sheet/YAML)
