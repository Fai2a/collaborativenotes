// const Note = require('../models/noteModel');
// const createNote = async (req, res) => {
//     const { title, content, subject, collaborators } = req.body;
//     const user = req.user.id; // Assuming you're getting the user from JWT
  
//     try {
//       const newNote = new Note({
//         title,
//         content,
//         subject,
//         collaborators: collaborators.split(','), // Split the collaborators by comma
//         user,
//       });
  
//       await newNote.save();
//       res.status(201).json(newNote);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating note', error });
//     }
//   };
    
// // Get all notes of the logged-in user
// const getNotes = async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user._id }); // Find notes by the user ID
//     res.status(200).json(notes); // Send the notes back
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching notes' });
//   }
// };

// const updateNote = async (req, res) => {
//     const { noteId } = req.params; // Get the noteId from the URL
//     const { title, content, subject, collaborators } = req.body; // Get data from the request body
  
//     try {
//       // Find the note by ID and update it
//       const updatedNote = await Note.findByIdAndUpdate(
//         noteId,
//         { title, content, subject, collaborators },
//         { new: true }  // This returns the updated note
//       );
  
//       // If the note is not found
//       if (!updatedNote) {
//         return res.status(404).json({ message: 'Note not found' });
//       }
  
//       res.status(200).json(updatedNote); // Send the updated note as the response
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating note', error });
//     }
//   };  
// // Delete a note
// const deleteNote = async (req, res) => {
//   const { noteId } = req.params; // Get the note ID from the URL parameter

//   try {
//     await Note.findByIdAndDelete(noteId); // Delete the note by ID
//     res.status(200).json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting note' });
//   }
// };

// module.exports = { createNote, getNotes, updateNote, deleteNote };
const Note = require('../models/notesSchema');
const User = require('../models/userSchema'); // Import User model to verify collaborators

// Create a new note
// const createNote = async (req, res) => {
//   const { title, content, subject, collaborators } = req.body;
//   const user = req.user.id; // Logged-in user from JWT
  
//   try {
//     // Split collaborators by comma and remove extra spaces
//     const collaboratorIds = collaborators.split(',').map(id => id.trim());

//     // Check if all collaborators are valid users
//     const validCollaborators = await User.find({ '_id': { $in: collaboratorIds } });

//     if (validCollaborators.length !== collaboratorIds.length) {
//       return res.status(400).json({ message: 'Some collaborators are not valid users' });
//     }

//     // Create the note
//     const newNote = new Note({
//       title,
//       content,
//       subject,
//       collaborators: collaboratorIds, // Store collaborators as user IDs
//       user,
//     });

//     await newNote.save();
//     res.status(201).json(newNote); // Return the newly created note
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating note', error });
//   }
// };
const createNote = async (req, res) => {
    const { title, content, subject, collaborators } = req.body;
    const user = req.user.id; // Assuming you're getting the user from JWT
    
    // Basic validation to check if required fields are provided
    if (!title || !content || !subject) {
      return res.status(400).json({ message: 'Title, content, and subject are required' });
    }
  
    try {
      // Ensure collaborators is an array (if provided)
      const collaboratorsArray = Array.isArray(collaborators) ? collaborators : collaborators.split(',').map(c => c.trim());
  
      // Create new note
      const newNote = new Note({
        title,
        content,
        subject,
        collaborators: collaboratorsArray, // Ensure collaborators is always an array
        user,
      });
  
      // Save the note to the database
      await newNote.save();
  
      // Send the created note back in the response
      res.status(201).json(newNote);
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating note:', error);
      res.status(500).json({ message: 'Error creating note', error: error.message });
    }
  };
  
// Get all notes for the logged-in user or collaborators
const getNotes = async (req, res) => {
  try {
    // Find notes where the user is the creator or a collaborator
    const notes = await Note.find({
      $or: [
        { user: req.user._id }, // The logged-in user is the creator
        { collaborators: req.user._id } // The logged-in user is a collaborator
      ]
    }).populate('collaborators', 'name email'); // Populate collaborator details like name and email

    res.status(200).json(notes); // Send the notes back
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Update an existing note
const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, subject, collaborators } = req.body;

  try {
    // Convert collaborators string to an array of IDs
    const collaboratorIds = collaborators.split(',').map(id => id.trim());

    // Validate that collaborators are valid users
    const validCollaborators = await User.find({ '_id': { $in: collaboratorIds } });

    if (validCollaborators.length !== collaboratorIds.length) {
      return res.status(400).json({ message: 'Some collaborators are not valid users' });
    }

    // Update the note with the new data
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, subject, collaborators: collaboratorIds },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote); // Return the updated note
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the logged-in user is the owner or a collaborator before deleting
    if (note.user.toString() !== req.user._id.toString() && !note.collaborators.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(noteId); // Delete the note
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };