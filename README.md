# Family Movie Watchlist API

A RESTful API for managing family movie watchlists with parent and child roles.

## Features
- JWT authentication
- Password hashing with bcryptjs
- Parent and child authorization
- View, add, update, and delete movies
- Track watched movies
- JSON file-based storage
- HTTP security headers with Helmet

## Technologies
- Node.js
- Express.js
- JSON Web Token
- bcryptjs
- Helmet

## Requirements
- Node.js 20.6 or later
- npm

## Installation
1. Clone this repository.
2. Run npm install.
3. Copy .env.example to .env.
4. Set a strong, random JWT_SECRET in .env.
5. Copy data/users.example.json to data/users.json.
6. Replace empty passwordHash values with bcrypt hashes for demo accounts.
7. Ensure data/watchlists.json exists.

## Run
Run npm start. The default port is 3001.

## API Endpoints

### Authentication
POST /api/auth/login

Example request:
{"username":"dad_miller","password":"your-demo-password"}

### Watchlist
All endpoints require a valid JWT Bearer token.

- GET /api/watchlist/:userId
- POST /api/watchlist/:userId/movies
- PUT /api/watchlist/:userId/movies/:movieId
- DELETE /api/watchlist/:userId/movies/:movieId

Example movie:
{"title":"Interstellar","genre":"Sci-Fi"}

## Roles
- Parent: Can modify family watchlists.
- Child: Can modify their own watchlist.

Note: The current GET endpoint requires authentication but does not restrict access to the user's own watchlist. Review access control before production use.

## Data and Security
- data/users.json is local and excluded from Git.
- data/users.example.json provides an example structure.
- Keep .env private.
- Never commit passwords, password hashes, JWT secrets, or real user data.
- Use a strong, unique JWT_SECRET.

## License
BSD-3-Clause
