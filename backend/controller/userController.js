// User Schema
const User = require('../models/userSchema');
// Generate Token
const { generateToken } = require('../helper/jwt');

// Create User Function
const createUser = async (req, res) => {
  try {
    const body = req.body;
    const user = new User(body);
    await user.save();
    res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
};

// Get All Users Function
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    res.status(400).json({ message: "Error fetching users", error: err.message });
  }
};

// Get User by ID Function
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Error fetching user", error: err.message });
  }
};

// Delete User Function
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err.message });
  }
};

// Update User Function
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err.message });
  }
};

// Login User Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = await generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
};
