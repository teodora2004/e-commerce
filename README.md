# E-commerce

![App Logo](logo.png)

## Description
This e-commerce app is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack along with Vite for a fast and efficient development experience. 
This app allows users to browse, search, and purchase products conveniently.

## Features
- **Product Catalog**: Browse through a wide range of products.
- **Search**: Quickly find products using the search functionality.
- **User Authentication**: Users can create accounts, log in, and manage their profiles.
- **Shopping Cart**: Add products to the cart and proceed to checkout.
- **Order Management**: Users can view their order history and status.
- **Admin Panel**: Admins can manage products, categories, and orders.

## Technologies Used
- MongoDB: Database for storing product, user, and order data.
- Express.js: Backend framework for handling HTTP requests.
- React.js: Frontend library for building user interfaces.
- Node.js: Server-side runtime environment.
- Vite: Frontend build tool for fast development.

## Installation
1. Clone the repository:
```
git clone https://github.com/teodora2004/e-commerce.git
```
2. Navigate to the project directory:
```
cd e-commerce
```

3. Install dependencies:
```
npm install
```

4. Set up environment variables:

- Create a `.env` file in the root directory.
- Add environment variables like `DATABASE_URI`, `JWT_SECRET`, `PORT`.

5. Start the development server:
```
npm run dev
```
This command will concurrently run both the backend and frontend servers.

Alternatively, you can run them individually:
- To start the backend server on port 5000:
  ```
  npm run backend
  ```
- To start the frontend server:
  ```
  npm run frontend
  ```

