# Calculator API Contract

**Base URL:** `http://localhost:3000`  
**Authentication Standard:** `Authorization: Bearer <TOKEN>` (Required for all routes except `/api/auth/*`)

---

## 1. Authentication (`/api/auth`)

### 1.1 Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "password": "secretpassword"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
      "message": "User registered successfully"
  }
  ```

### 1.2 Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
      "email": "jane@example.com",
      "password": "secretpassword"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiI...",
      "user": {
          "id": 1,
          "email": "jane@example.com",
          "first_name": "Jane",
          "last_name": "Doe"
      }
  }
  ```

---

## 2. Standard Calculations (`/api/calculations`)

### 2.1 Get All Calculations
- **URL:** `/api/calculations`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  [
      {
          "id": 101,
          "operand1": 15,
          "operator": "+",
          "operand2": 35,
          "result": 50,
          "created_at": "2026-03-23T10:00:00.000Z",
          "user": { "id": 1, "first_name": "Jane", "last_name": "Doe" }
      }
  ]
  ```

### 2.2 Get Calculation By ID
- **URL:** `/api/calculations/:id`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "id": 101,
      "operand1": 15,
      "operator": "+",
      "operand2": 35,
      "result": 50,
      "created_at": "2026-03-23T10:00:00.000Z",
      "user": { "id": 1, "first_name": "Jane", "last_name": "Doe" }
  }
  ```

### 2.3 Perform a Calculation
- **URL:** `/api/calculations`
- **Method:** `POST`
- **Auth required:** Yes
- **Request Body:**
  ```json
  {
      "operand1": 15,
      "operator": "+",
      "operand2": 35
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
      "operand1": 15,
      "operator": "+",
      "operand2": 35,
      "result": 50,
      "user": { "id": 1, /* ... */ },
      "id": 101,
      "created_at": "2026-03-23T10:00:00.000Z"
  }
  ```

### 2.2 Get User Calculation History
- **URL:** `/api/calculations/history`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  [
      {
          "id": 101,
          "operand1": 15,
          "operator": "+",
          "operand2": 35,
          "result": 50,
          "created_at": "2026-03-23T10:00:00.000Z",
          "user": {
               "id": 1,
               "first_name": "Jane",
               "last_name": "Doe"
          }
      }
  ]
  ```

---

## 3. Administrative User Management (`/api/users`)

### 3.1 Get All Users
- **URL:** `/api/users`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  [
      {
          "id": 1,
          "first_name": "Jane",
          "last_name": "Doe",
          "email": "jane@example.com",
          "is_active": true
      }
  ]
  ```

### 3.2 Get User By Email
- **URL:** `/api/users/by-email/:email`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "id": 1,
      "email": "jane@example.com"
  }
  ```

### 3.3 Get User By ID
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "id": 1,
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "is_active": true
  }
  ```

### 3.4 Update User Data
- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Auth required:** Yes
- **Request Body:** *(All fields are optional, `email` changes are safely ignored)*
  ```json
  {
      "first_name": "Janet",
      "is_active": false
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
      "id": 1,
      "first_name": "Janet",
      "last_name": "Doe",
      "email": "jane@example.com",
      "is_active": false
  }
  ```

### 3.5 Delete User
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "message": "User deleted successfully. All calculations under this user were also automatically cascaded to deletion!"
  }
  ```

---

## 4. Administrative Calculations (`/api/calculations`)

### 4.1 Get All Calculations By explicit User ID
- **URL:** `/api/calculations/user/:userId`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  [
      {
          "id": 102,
          "operand1": 5,
          "operator": "-",
          "operand2": 2,
          "result": 3,
          "created_at": "2026-03-23T11:00:00.000Z",
          "user": { "id": 2, "first_name": "Admin" }
      }
  ]
  ```

### 4.2 Delete Calculations By User ID
- **URL:** `/api/calculations/user/:userId`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "message": "Deleted 7 calculations successfully for user ID 2."
  }
  ```

### 4.3 Truncate All Calculations Globally
- **URL:** `/api/calculations`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
      "message": "All calculations deleted explicitly across all users."
  }
  ```
