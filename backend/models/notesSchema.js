import mongoose from 'mongoose';

// Define the schema for a note
const noteSchema = new mongoose.Schema({
  noteId: {
    type: String,
    required: true,
    unique: true // Optional: If noteId should be unique
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  lastEditedBy: {
    type: String
  },
  lastEditedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  collaborators: {
    type: [String], // Array of strings (collaborators)
    default: []  // Default to an empty array
  }
});

// Create the model
const Note = mongoose.model('Note', noteSchema);

export default Note;