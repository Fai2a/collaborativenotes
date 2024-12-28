const express = require('express');
const { 
    createUser, 
    getUsers, 
    deleteUser, 
    updateUser, 
    loginUser 
} = require('../controller/userController');  // Check this path

const routes = express.Router();

// User Routes
routes.post('/register', createUser); // Create a new user (Registration)
routes.get('/', getUsers); // Get all users
routes.delete('/:id', deleteUser); // Delete a user by ID
routes.patch('/:id', updateUser); // Update a user by ID
routes.post('/login', loginUser); // Login a user

module.exports = routes;
