import Swal from 'sweetalert2';
import { types } from '../types/types';
import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';


export const startNewEntryNoteAction = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const documentReference = await db.collection(`${uid}/journal/notes`).add(newNote);
    //console.log(documentReference);

    dispatch(activeNoteAction(documentReference.id, newNote));
    dispatch(addNewNoteAction(documentReference.id, newNote));
  }
}

export const activeNoteAction = (id, note) => ({
  type: types.noteActive,
  payload: {
    id,
    ...note
  }
});

export const addNewNoteAction = (idNote, note) => ({
  type: types.notesAddNewEntry,
  payload: {
    id: idNote,
    ...note
  }
});

export const startLoadingNotesAction = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotesAction(notes));
  }
}

export const setNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const startSaveNoteAction = (note) => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    dispatch(refreshNoteAction(note.id, note));
    
    Swal.fire('Saved', note.title, 'success');
  }
}

export const refreshNoteAction = (idNote, note) => ({
  type: types.noteUpdated,
  payload: {
    id: idNote,
    note
  }
});

export const startLoadingImageAction = (file) => {
  return async (dispatch, getState) => {
    const {active:note} = getState().notes;

    Swal.fire({
      title: 'Uploading',
      html: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const fileUrl = await fileUpload(file);

    note.url = fileUrl;
    dispatch(startSaveNoteAction(note));

    Swal.close();
  }
}

export const startDeletingNoteAction = (idNote) => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    await db.doc(`${uid}/journal/notes/${idNote}`).delete();

    dispatch(deleteNoteAction(idNote));
  }
}

export const deleteNoteAction = (idNote) => ({
  type: types.noteDelete,
  payload: idNote
});

export const notesLogoutAction = () => ({
  type: types.notesLogoutCleaning
});