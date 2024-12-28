import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import CreateNote from './pages/CreateNotes';
import NotePage from './pages/NotePage';
import Login from './pages/Login';
import Register from './pages/Registration';
import Dashboard from './pages/Dashboard'
import NotesDashboard from './pages/notesApp'
import NotesApp from './pages/NotePage'



const App = () => {
    return (
        <Router>
            <Routes>  {/* Replace Switch with Routes */}
                <Route path="/" element={<Register />} />       
                <Route path="/create" element={<CreateNote />} />
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notesdashboard" element={<NotesDashboard />} />
                <Route path="/notesApp;" element={<NotesApp/>} />
            </Routes>
        </Router>
    );
};

export default App;
