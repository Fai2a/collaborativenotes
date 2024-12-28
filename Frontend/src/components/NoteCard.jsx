// NoteCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
    return (
        <div className="note-card">
            <h2>{note.title}</h2>
            <p>{note.subject}</p>
            <p><strong>Last Edited by: </strong>{note.lastEditedBy}</p>
            <Link to={`/note/${note._id}`}>View Note</Link>
        </div>
    );
};

export default NoteCard;
