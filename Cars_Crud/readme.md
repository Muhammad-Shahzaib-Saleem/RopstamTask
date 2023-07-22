# Car Database API

This repository contains a Node.js-based API for managing a car database. The API is built using Express.js and MongoDB for data storage. It provides basic CRUD (Create, Read, Update, Delete) operations for managing car data in the database.

## Installation

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.
2. Clone this repository to your local machine.


git clone <repository_url>

- Install the required dependencies by running the following command inside the project directory:

-- npm install

Create a MongoDB database and configure the connection URL in the model/car.js file.

// model/car.js

const mongoose = require('mongoose');

// Replace 'your_mongodb_connection_url' with your actual MongoDB connection URL
mongoose.connect('your_mongodb_connection_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Rest of the Car model schema and definition


## API Endpoints

1. Get Car Database Status
Endpoint: /carsdb
HTTP Method: GET
Description: Checks the status of the car database.
Response Codes:
201 (OK) - Returns a success message if the database is working fine.
401 (Unauthorized) - Returns an error message if there's an issue with the database connection.
2. Create a New Car Entry
Endpoint: /cars
HTTP Method: POST
Description: Creates a new entry for a car in the database.
Request Body: Expects a JSON object containing car details (e.g., make, model, registration_no).
Response Codes:
201 (Created) - Returns the newly created car object if successful.
401 (Unauthorized) - Returns an error message if there's an issue with the database connection.
3. Read All Cars
Endpoint: /cars
HTTP Method: GET
Description: Retrieves all car entries from the database.
Response Codes:
201 (OK) - Returns an array of car objects if successful.
401 (Unauthorized) - Returns an error message if there's an issue with the database connection.
4. Update Car Entry
Endpoint: /cars/:registration_no
HTTP Method: PATCH
Description: Updates the details of a specific car entry based on the registration number.
URL Parameters: Replace :registration_no in the endpoint with the actual registration number of the car you want to update.
Request Body: Expects a JSON object containing the updated car details (e.g., make, model, registration_no).
Response Codes:
201 (OK) - Returns the updated car object if successful.
401 (Unauthorized) - Returns an error message if there's an issue with the database connection.
5. Delete Car Entry
Endpoint: /cars/:id
HTTP Method: DELETE
Description: Deletes a specific car entry from the database based on its ID.
URL Parameters: Replace :id in the endpoint with the actual ID of the car you want to delete.
Response Codes:
200 (OK) - Returns the deleted car object if successful.
400 (Bad Request) - Returns an error message if the ID parameter is missing or invalid.
401 (Unauthorized) - Returns an error message if there's an issue with the database connection.

## Getting Started
To run the API, follow the installation steps mentioned above. Once all the dependencies are installed and the MongoDB connection is properly configured, you can start the server using the following command:

-- npm start

By default, the server will run on http://localhost:3001. You can use tools like Postman or cURL to make requests to the API endpoints.
