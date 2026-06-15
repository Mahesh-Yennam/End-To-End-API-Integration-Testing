# End-To-End API Integration Testing

This project demonstrates end-to-end API integration testing for a Node.js and Express application using **Jest**, **Supertest**, **Mongoose**, and **MongoDB Memory Server**.

The objective is to test the complete request lifecycle, from the incoming HTTP request to database operations and the final API response.

---

## What is API Integration Testing?

API Integration Testing verifies that multiple layers of an application work together correctly.

This project tests the following flow:

```text
HTTP Request
     ↓
Supertest
     ↓
Express Route
     ↓
Controller
     ↓
Mongoose Model
     ↓
MongoDB Memory Server
     ↓
HTTP Response
```

Unlike unit tests, integration tests validate the interaction between application components and the database.

---

## Learning Objectives

* API integration testing fundamentals
* Testing Express routes with Supertest
* Testing controllers and business logic
* Testing MongoDB operations using Mongoose
* Using MongoDB Memory Server for isolated testing
* Managing test setup and teardown
* Validating API responses and database state
* Testing CRUD operations end-to-end

---

## Tech Stack

* Node.js
* Express.js
* Jest
* Supertest
* Mongoose
* MongoDB Memory Server

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

Install dependencies:

```bash
npm install
```

---

## Running Tests

Execute all tests:

```bash
npm test
```

Example output:

```text
PASS tests/user.test.js

✓ POST /users should create user
✓ GET /users should return users
✓ PUT /users/:id should update user
✓ DELETE /users/:id should delete user
✓ POST /users should validate required fields
✓ PUT /users/:id should return 404 when user not found
✓ DELETE /users/:id should return 404 when user not found
```

---

## Project Structure

```text
.
├── src
│   ├── app.js
│   ├── controllers
│   │   └── user.controller.js
│   ├── models
│   │   └── user.model.js
│   └── routes
│       └── user.routes.js
│
├── tests
│   ├── setup.js
│   └── user.test.js
│
├── jest.config.js
├── package.json
└── README.md
```

---

## API Endpoints

### Create User

```http
POST /users
```

Request:

```json
{
  "name": "Mahesh"
}
```

Response:

```json
{
  "_id": "6650abc123",
  "name": "Mahesh"
}
```

---

### Get All Users

```http
GET /users
```

Response:

```json
[
  {
    "_id": "6650abc123",
    "name": "Mahesh"
  }
]
```

---

### Update User

```http
PUT /users/:id
```

Request:

```json
{
  "name": "John"
}
```

Response:

```json
{
  "_id": "6650abc123",
  "name": "John"
}
```

---

### Delete User

```http
DELETE /users/:id
```

Response:

```json
{
  "message": "User deleted successfully"
}
```

---

## Test Environment Setup

### MongoDB Memory Server

A temporary MongoDB instance is started before the tests execute.

Benefits:

* No external database required
* Fast execution
* Isolated environment
* No risk of modifying development or production data

---

### Test Lifecycle

#### beforeAll()

```javascript
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(
    mongoServer.getUri()
  );
});
```

Purpose:

* Start MongoDB Memory Server
* Connect Mongoose

---

#### beforeEach()

```javascript
beforeEach(async () => {
  const collections =
    mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
```

Purpose:

* Clear all collections
* Ensure test isolation

---

#### afterAll()

```javascript
afterAll(async () => {
  await mongoose.connection.close();

  await mongoServer.stop();
});
```

Purpose:

* Close database connection
* Stop MongoDB Memory Server

---

## Test Cases Covered

### POST /users

* Creates a new user
* Returns HTTP 201
* Persists data in MongoDB

### GET /users

* Returns all users
* Returns HTTP 200

### PUT /users/:id

* Updates an existing user
* Returns updated data
* Persists changes in MongoDB

### DELETE /users/:id

* Deletes an existing user
* Returns success message
* Removes record from MongoDB

### Validation Testing

* Returns HTTP 400 for invalid input
* Validates required fields

### Not Found Testing

* Returns HTTP 404 when user does not exist
* Covers update and delete operations

---

## Example Integration Test

```javascript
test('POST /users should create user', async () => {

  const response = await request(app)
    .post('/users')
    .send({
      name: 'Mahesh'
    });

  expect(response.statusCode)
    .toBe(201);

  const user = await User.findOne({
    name: 'Mahesh'
  });

  expect(user).not.toBeNull();

});
```

This test validates:

* HTTP request
* Route handling
* Controller execution
* Database insertion
* Response generation

---

## Testing Workflow

```text
Start MongoDB Memory Server
          ↓
Connect Mongoose
          ↓
Clear Database
          ↓
Send Request Using Supertest
          ↓
Execute Route
          ↓
Execute Controller
          ↓
Perform Database Operation
          ↓
Verify Response
          ↓
Verify Database State
          ↓
Cleanup Resources
```

---

## Concepts Learned

* Integration Testing
* Express Route Testing
* Controller Testing
* Database Testing
* Supertest
* MongoDB Memory Server
* CRUD API Testing
* Async Testing
* Test Isolation
* Error Handling Validation

---

## Future Improvements

* Authentication Testing (JWT)
* Authorization Testing
* Custom Error Middleware
* Mocking External Services
* Code Coverage Reports
* GitHub Actions CI/CD
* Dockerized Test Environment
* Advanced Validation Testing

---

## Author

Mahesh

Learning Backend API Integration Testing with Jest, Supertest, Mongoose and MongoDB Memory Server 🚀
