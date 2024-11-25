# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker]()

## Downloading

```bash
git clone {repository URL}
```

## Installing NPM modules

```bash
npm install
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application with Docker

### To start app in dev(watch) mode

```bash
npm run docker:dev:start
```

### To stop app in dev mode

```bash
npm run docker:dev:stop
```

### To build app for pushing to DockerHub

```bash
npm run docker:build
```

### To start built app

```bash
npm run docker:start
```

### To stop built app

```bash
npm run docker:stop
```

### To check on vulnerabilities

```bash
npm run docker:vulns
```

### To push the app to DockerHub

```bash
npm run docker:push
```

### To start app with DockerHub images

```bash
npm run docker:hub:start
```

### To stop app DockerHub images

```bash
npm run docker:hub:stop
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Using Swagger to work with the API

<http://localhost:4000/api/>

## Endpoints

**Users (/user)**

```typescript
interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
```

| Method | Path      | Description          | Status Codes       |
| ------ | --------- | -------------------- | ------------------ |
| GET    | /user     | Get all users        | 200                |
| GET    | /user/:id | Get user by ID       | 200, 400, 404      |
| POST   | /user     | Create user          | 201, 400           |
| PUT    | /user/:id | Update user password | 200, 400, 404, 403 |
| DELETE | /user/:id | Delete user          | 204, 400, 404      |

**Artists (/artist)**

```typescript
interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
```

| Method | Path        | Description      | Status Codes  |
| ------ | ----------- | ---------------- | ------------- |
| GET    | /artist     | Get all artists  | 200           |
| GET    | /artist/:id | Get artist by ID | 200, 400, 404 |
| POST   | /artist     | Create artist    | 201, 400      |
| PUT    | /artist/:id | Update artist    | 200, 400, 404 |
| DELETE | /artist/:id | Delete artist    | 204, 400, 404 |

**Albums (/album)**

```typescript
interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
```

| Method | Path       | Description     | Status Codes  |
| ------ | ---------- | --------------- | ------------- |
| GET    | /album     | Get all albums  | 200           |
| GET    | /album/:id | Get album by ID | 200, 400, 404 |
| POST   | /album     | Create album    | 201, 400      |
| PUT    | /album/:id | Update album    | 200, 400, 404 |
| DELETE | /album/:id | Delete album    | 204, 400, 404 |

**Tracks (/track)**

```typescript
interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
```

| Method | Path       | Description     | Status Codes  |
| ------ | ---------- | --------------- | ------------- |
| GET    | /track     | Get all tracks  | 200           |
| GET    | /track/:id | Get track by ID | 200, 400, 404 |
| POST   | /track     | Create track    | 201, 400      |
| PUT    | /track/:id | Update track    | 200, 400, 404 |
| DELETE | /track/:id | Delete track    | 204, 400, 404 |

**Favorites (/favs)**

```typescript
interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
```

| Method | Path             | Description                  | Status Codes  |
| ------ | ---------------- | ---------------------------- | ------------- |
| GET    | /favs            | Get all favorites            | 200           |
| POST   | /favs/track/:id  | Add track to favorites       | 201, 400, 422 |
| DELETE | /favs/track/:id  | Delete track from favorites  | 204, 400, 404 |
| POST   | /favs/album/:id  | Add album to favorites       | 201, 400, 422 |
| DELETE | /favs/album/:id  | Delete album from favorites  | 204, 400, 404 |
| POST   | /favs/artist/:id | Add artist to favorites      | 201, 400, 422 |
| DELETE | /favs/artist/:id | Delete artist from favorites | 204, 400, 404 |
