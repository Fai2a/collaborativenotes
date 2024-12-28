const express = require('express');
const { validateToken } = require('../helper/jwt');
const {createNote, getNote,deleteNote,getNoteOne,updateNote} =require('../controller/notesController')
const { 
    createNote, 
    getNotesByUserId, 
    deleteNote, 
    updateNote 
} = require('../controller/notesController');

const routes = express.Router();

// Notes All Routes
const app = express();  
router.post('/', createNote ); 
router.get('/', getNote );
router.get('/one', getNoteOne );
router.delete('/:id', deleteNote );
router.put('/:id', updateNote );

module.exports = routes;
