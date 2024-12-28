const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes'); // Assuming you also want user routes here

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongodbUrl = 'mongodb://localhost:27017/backend'; // Change this to your MongoDB connection URL if needed

const port = 4000;
const frontendPort = 3000; // Port for frontend


app.use('/note', noteRoutes);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: `http://localhost:${frontendPort}`, // Allow frontend to communicate with backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes for Notes and Users
app.use('/notes', notesRoutes); // Notes routes
app.use('/user', userRoutes);   // User routes

// app.get('/twitter', (req, res) => {
//   res.send("This is twitter page");
// });

// app.get('/login', (req, res) => {
//    res.send("This is login page");
// });

// Core Logic for User Authentication and Notes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Perform login logic here (e.g., check user credentials from MongoDB)
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Register new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Connect to MongoDB
mongoose.connect(mongodbUrl)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
