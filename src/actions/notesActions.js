import { types } from '../types/types';
import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';


export const startNewEntryNoteAction = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const documentReference = await db.collection(`${uid}/journal/notes`).add(newNote);
    console.log(documentReference);

    dispatch(activeNoteAction(documentReference.id, newNote));
  }
}

export const activeNoteAction = (id, note) => ({
  type: types.noteActive,
  payload: {
    id,
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