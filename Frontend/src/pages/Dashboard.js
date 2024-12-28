import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig"; // Import the Firestore instance
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const NotesApp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // New field for createdBy
  const [lastEditedBy, setLastEditedBy] = useState(""); // Can be dynamically set
  const [collaborators, setCollaborators] = useState([]); // Empty array by default
  const [newCollaborator, setNewCollaborator] = useState(""); // Input for new collaborator
  const [createdAt] = useState(new Date().toLocaleString());
  const [lastEditedAt, setLastEditedAt] = useState(new Date().toLocaleString());
  const [notes, setNotes] = useState([]); // State to store notes for the dashboard
  const [editingNote, setEditingNote] = useState(null); // Track the note being edited
  const [newComment, setNewComment] = useState(""); // New state for the comment field
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  // Function to fetch notes from Firestore
  const fetchNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notesList = [];
    querySnapshot.forEach((doc) => {
      notesList.push({ id: doc.id, ...doc.data() });
    });
    setNotes(notesList); // Update notes state with fetched data
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to save or update note to Firestore
  const handleSave = async () => {
    setLastEditedAt(new Date().toLocaleString()); // Update last edited timestamp

    try {
      if (editingNote) {
        // Update note in Firestore
        const noteRef = doc(db, "notes", editingNote.id);
        await updateDoc(noteRef, {
          title,
          content,
          subject,
          createdBy,
          lastEditedBy,
          createdAt,
          lastEditedAt,
          collaborators,
        });
        alert("Note updated successfully!");
      } else {
        // Save new note to Firestore
        await addDoc(collection(db, "notes"), {
          title,
          content,
          subject,
          createdBy,
          lastEditedBy,
          createdAt,
          lastEditedAt,
          collaborators,
          comments: [] // Initialize with an empty array for comments
        });
        alert("Note saved successfully!");
      }
      // After saving/updating, fetch updated notes list
      fetchNotes();
      // Reset form after saving
      setTitle("");
      setContent("");
      setSubject("");
      setCreatedBy("");
      setCollaborators([]);
      setNewCollaborator("");
      setEditingNote(null);
    } catch (error) {
      console.error("Error saving/updating document: ", error);
      alert("Error saving note.");
    }
  };

  // Add a new collaborator
  const handleAddCollaborator = () => {
    if (newCollaborator) {
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaborator(""); // Clear input field after adding
    }
  };

  // Function to handle Delete
  const handleDelete = async (id) => {
    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
      alert("Note deleted successfully!");
      fetchNotes(); // Fetch updated notes list
    } catch (error) {
      console.error("Error deleting note: ", error);
      alert("Error deleting note.");
    }
  };

  // Function to handle Edit (populate form with current note data)
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject);
    setCreatedBy(note.createdBy);
    setCollaborators(note.collaborators);
    setEditingNote(note); // Set the note being edited
  };

  // Handle adding a comment to a note
  const handleAddComment = async (noteId) => {
    if (newComment) {
      const noteRef = doc(db, "notes", noteId);
      const noteToUpdate = notes.find((note) => note.id === noteId);

      // Ensure comments field is an array before adding a comment
      const updatedComments = Array.isArray(noteToUpdate.comments)
        ? [...noteToUpdate.comments, newComment] // Add new comment to existing comments
        : [newComment]; // If it's not an array, initialize it as an array with the new comment

      await updateDoc(noteRef, {
        comments: updatedComments,
      });

      setNewComment(""); // Clear the comment input field
      fetchNotes(); // Fetch the updated list with the new comment
    }
  };

  // Logout function to handle redirection to registration page
  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing user session)
    navigate("/register"); // Redirect to registration page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-100 text-blue-900 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome to Your Notes World</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <p className="mt-2 text-lg text-center">
          Create, edit, and manage your notes with ease!
        </p>
      </div>

      {/* Note Creation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            ></textarea>
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Created By Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Created By</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Collaborators Field */}
          <div className="space-x-2">
            <input
              type="text"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              placeholder="Add a collaborator"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCollaborator}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Collaborator
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </form>
      </div>

      {/* Notes Dashboard */}
      <div className="mt-8 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{note.title}</h2>
            <p className="mt-2 text-gray-600">{note.content}</p>
            <p className="mt-2 text-gray-500">Subject: {note.subject}</p>
            <p className="mt-2 text-gray-500">Created by: {note.createdBy}</p>

            {/* Comment Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Comments</h3>
              {note.comments && note.comments.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {note.comments.map((comment, index) => (
                    <li key={index} className="text-gray-600">
                      {comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}

              {/* Add Comment */}
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              />
              <button
                onClick={() => handleAddComment(note.id)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-2"
              >
                Add Comment
              </button>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
