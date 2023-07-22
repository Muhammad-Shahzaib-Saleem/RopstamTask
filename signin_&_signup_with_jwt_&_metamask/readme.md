# Project Name: SignUp and Login System with MetaMask Integration

## Description:

This project implements a user sign-up and login system with MetaMask integration using Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT). Users can sign up and log in using their email and password or through MetaMask Ethereum address authentication. The project provides the following functionality:

1. User Sign Up:
   - Users can register using their email and password.
   - Passwords are hashed using bcrypt before storing them in the database.
   - A JWT token is generated upon successful registration and stored in a secure HTTP-only cookie for authentication.

2. User Login:
   - Users can log in using their registered email and password.
   - The entered password is compared with the hashed password in the database using bcrypt.
   - If the login is successful, a JWT token is generated and stored in a cookie for authentication.

3. MetaMask Sign Up:
   - Users can sign up using their MetaMask Ethereum address.
   - A signed message and Ethereum address are sent to the server for verification.
   - If the signature is valid, the server checks if the Ethereum address is already registered.
   - If the address is not registered, a new user record is created in the database.
   - If the address is already registered, the user is considered logged in.

## Project Structure:

- `index.js`: The main entry point of the application, containing the server setup and route handling.
- `middleware/Auth.js`: A custom middleware function to authenticate JWT tokens and protect routes from unauthorized access.
- `model/schem.js`: Mongoose schema for user registration using email and password.
- `model/schema-metamask.js`: Mongoose schema for user registration using MetaMask Ethereum address.
- `Controller/email.js`: Controller to handle sending welcome emails to newly registered users.
- `views`: Directory containing EJS templates for rendering the front-end pages.
- `public`: Directory for storing static assets (CSS, JS, images, etc.).
- `routes`: Directory containing route handlers for various endpoints (signup, login, metamask-signup).

## Installation and Setup:

1. Clone the repository to your local machine:

git clone https://github.com/Muhammad-Shahzaib-Saleem/SignUpAndLoginSystem.git

- cd SignUpAndLoginSystem
- npm install


3. Set up your MongoDB database and adjust the `mongodb` connection URL in `index.js`.

4. Start the server:

- npm start


5. Open your browser and visit `http://localhost:3100` to access the application.

## Usage:

1. User Registration (Email and Password):
- Visit the homepage (`/`) and click on the "Sign Up" button.
- Enter your email, password, and confirm password.
- Click on the "Sign Up" button to create an account.
- Upon successful registration, you will be redirected to the login page.

2. User Login (Email and Password):
- Visit the login page (`/login`) and enter your registered email and password.
- Click on the "Log In" button.
- If the credentials are correct, you will be redirected to the main page.

3. MetaMask Sign Up (Ethereum Address):
- Visit the MetaMask sign-up page (`/metamask-signup`) and follow the instructions.
- Provide a signed message and your Ethereum address.
- If the signature is valid and the Ethereum address is not already registered, a new account will be created, and you will be redirected to the main page.

4. Accessing Private Pages:
- Once logged in, you can access the private page (`/private`), which will display a welcome message with your username.

## Note:

- Make sure you have MongoDB installed and running before starting the server.
- The MetaMask sign-up functionality assumes the signature is valid for demonstration purposes. In a production environment, additional validation should be implemented to ensure the signature's authenticity.

## Technologies Used:

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- EJS (Embedded JavaScript) for templating

## Author:

- [Muhammad Shahzaib Saleem](https://github.com/Muhammad-Shahzaib-Saleem)

