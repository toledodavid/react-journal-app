import { db } from '../firebase/firebase-config';
import { types } from '../types/types';


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

export const setNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes
});