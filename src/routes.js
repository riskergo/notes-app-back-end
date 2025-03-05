const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editHandlerById,
  deleteNoteById,
  showNotesToConsole,
} = require('./handler.js');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    //* terpisah
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editHandlerById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteById,
  },
  {
    method: 'GET',
    path: '/notes/debug',
    handler: showNotesToConsole
  }
];

module.exports = routes;
