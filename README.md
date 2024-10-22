
# Personal Expense Tracker - API

This project is a RESTful API built using Node.js and Express.js for managing personal financial records, including income and expenses. Users can register, login, and add their transactions, which are then linked to their account.

---

## 1. Setup and Run Instructions

### Prerequisites:
- Node.js and npm installed
- MongoDB installed locally or a cloud MongoDB database (like MongoDB Atlas)

### Environment Variables:
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_Secret_Key_For_JWT_Tokens>
```

### Installation:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project folder:
   ```bash
   cd personal-expense-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`.

---

## 2. API Documentation

### Base URL:
```
http://localhost:5000/api
```

### Authentication Endpoints:

| Method | Endpoint       | Description                   | Authorization | Request Body                   | Response             |
|--------|----------------|-------------------------------|---------------|---------------------------------|-----------------------|
| POST   | `/register`     | Register a new user           | None          | `{ name, email, password }`     | `{ token }`           |
| POST   | `/login`        | Login a user                  | None          | `{ email, password }`           | `{ token }`           |

#### Example Request Body for `/register`:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

---

### Transaction Endpoints (Protected):

**All transaction routes require the Authorization token from login in the `Authorization` header:**

```
Authorization: Bearer <token>
```

| Method | Endpoint                | Description                        | Request Body                           | Response                                      |
|--------|-------------------------|------------------------------------|----------------------------------------|----------------------------------------------|
| POST   | `/transactions`          | Add a new transaction              | `{ type, category, amount, description }` | `{ transaction }`                             |
| GET    | `/transactions`          | Get all transactions of the user   | None                                   | `[ { transactions } ]`                        |
| GET    | `/transactions/:id`      | Get a transaction by ID            | None                                   | `{ transaction }`                             |
| PUT    | `/transactions/:id`      | Update a transaction by ID         | `{ type, category, amount, description }` | `{ transaction }`                             |
| DELETE | `/transactions/:id`      | Delete a transaction by ID         | None                                   | `{ message: 'Transaction removed' }`          |
| GET    | `/summary`               | Get a summary of transactions      | Optional Query: `{ category, fromDate, toDate }` | `{ totalIncome, totalExpense, balance }` |

#### Example Request Body for `/transactions`:
```json
{
  "type": "expense",
  "category": "Food",
  "amount": 100,
  "description": "Lunch at cafe"
}
```

---

## 3. Postman Screenshots

Here are the screenshots of the API calls made using Postman:

### 1. **User Registration**:
**POST** `/api/register`
![User Registration](./screenshots/register.png)

### 2. **User Login**:
**POST** `/api/login`
![User Login](./screenshots/login.png)

### 3. **Add a Transaction**:
**POST** `/api/transactions`
![Add Transaction](./screenshots/add-transaction.png)

### 4. **Get Transactions**:
**GET** `/api/transactions`
![Get Transactions](./screenshots/get-transactions.png)

### 5. **Get Transaction by ID**:
**GET** `/api/transactions/:id`
![Get Transaction by ID](./screenshots/get-transaction-by-id.png)

### 6. **Update a Transaction**:
**PUT** `/api/transactions/:id`
![Update Transaction](./screenshots/update-transaction.png)

### 7. **Delete a Transaction**:
**DELETE** `/api/transactions/:id`
![Delete Transaction](./screenshots/delete-transaction.png)

### 8. **Get Transaction Summary**:
**GET** `/api/summary`
![Transaction Summary](./screenshots/transaction-summary.png)

---

### Notes:
- Use **Postman** to test the API. Make sure to add the token from the login response in the Authorization header when making requests to the protected routes.
- You can extend the API by adding more filters and features like pagination or category-based summary reports.
