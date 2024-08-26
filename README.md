This assignment will help you familiarize with the basic concepts of REST and how to develop a set of RESTful APIs.

# Installation

```bash
npm install
```

## Migrate database

```bash
npm run migrate
```

Enter some name for the migration

This step will migrate the database and adding seeding data.
You can see detail at prisma/seed.ts.

## Run this program

```bash
npm run dev
```

## TEST Api

```bash
http://localhost:8000/api-docs
```

## Overview

This project is a RESTful API designed to manage a small company's employees and customers. It includes basic CRUD operations for users, employees, and customers, with authentication and authorization handled via JWT tokens. The project also includes validation using `Joi` to ensure data integrity.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routing.
- **Joi**: A powerful schema description language and data validator for JavaScript.
- **JSON Web Token (JWT)**: For secure user authentication and authorization.
- **Swagger (OpenAPI 3.0)**: API documentation and testing.
- **Filesystem (fs)**: To read and write data from/to JSON files.

## API Endpoints

### Users

- **Login**
  - `POST /users/login`
  - Request Body: `{ "username": "admin", "password": "admin" }`
  - Response: JWT token on successful login.
- **Register**
  - `POST /users/register`
  - Request Body: `{ "username": "staff", "password": "staff", "employeeNumber": 99 }`
  - Response: Success message on successful registration.

### Employees

- **Get All Employees**
  - `GET /employees`
  - Requires JWT token.
  - Response: List of all employees.
- **Create Employee**
  - `POST /employees`
  - Requires JWT token.
  - Request Body: Employee data (JSON).
  - Response: Success message on successful creation.
- **Get Employee by ID**

  - `GET /employees/{employeeId}`
  - Requires JWT token.
  - Response: Employee data.

- **Update Employee by ID**

  - `PUT /employees/{employeeId}`
  - Requires JWT token.
  - Request Body: Updated employee data (JSON).
  - Response: Success message on successful update.

- **Delete Employee by ID**
  - `DELETE /employees/{employeeId}`
  - Requires JWT token.
  - Response: Success message on successful deletion.

### Customers

- **Get All Customers**

  - `GET /customers`
  - Requires JWT token.
  - Response: List of all customers.

- **Create Customer**
  - `POST /customers`
  - Requires JWT token.
  - Request Body: Customer data (JSON).
  - Response: Success message on successful creation.
- **Get Customer by ID**

  - `GET /customers/{customerId}`
  - Requires JWT token.
  - Response: Customer data.

- **Update Customer by ID**

  - `PUT /customers/{customerId}`
  - Requires JWT token.
  - Request Body: Updated customer data (JSON).
  - Response: Success message on successful update.

- **Delete Customer by ID**
  - `DELETE /customers/{customerId}`
  - Requires JWT token.
  - Response: Success message on successful deletion.

## Authentication

- **JWT Authentication**: The API uses JWT tokens for secure authentication. After logging in, you'll receive a token that you must include in the `Authorization` header (as `Bearer <token>`) for all subsequent requests.

## Validation

- **Joi Validation**: The API uses Joi to validate incoming request data. This ensures that only valid data is processed and stored.

## Setup

using npm install
to run project : npm run dev

## Using the API

Swagger: You can use Swagger UI to explore and test the API. Once the server is running, navigate to http://localhost:8000/api-docs to access the Swagger interface.
