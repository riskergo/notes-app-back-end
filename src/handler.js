const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
});

const getNoteById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined){
    return {
      status: 'success',
      data: {
        note,
      }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editHandlerById = (request, h) => {

  //* dapatkan id dari client
  const { id } = request.params;

  //* ambil title, tags, body dari client
  const { title, tags, body } = request.payload;
  //* saat di-update tentunya update juga timestamp-nya
  const updateAt = new Date().toISOString();

  //* untuk mencocokkan id dari client dengan catatan yang ingin diubah, gunakan
  //* metode array indexing untuk mencari id yang cocok
  const index = notes.findIndex((note) => note.id === id);

  //* setelah didapatkan ubah, jika tidak akan menghasilkan nilai -1, terapkan pengkondisian
  if (index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diubah'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui, karena Id tidak ditemukan'
  });
  return response;
};

const deleteNoteById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const showNotesToConsole = (_, h) => {
  if (notes.length !== 0){

    console.log('==========');
    notes.forEach((note) => console.log(note));

    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil ditampilkan',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Notes kosong',
  });

  response.code(404);
  return response;
};

module.exports =  {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editHandlerById,
  deleteNoteById,
  showNotesToConsole,
};