import { types } from '../types/types';

/*
  {
    notes: [],
    active: null,
    active: {
      id: 'qxcwe323df2e',
      title: '',
      body: '',
      imageUrl: '',
      date: 2232328823
    }
  }
*/

const initialState = {
  notes: [],
  active: null
}


export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.noteActive:
      return {
        ...state,
        active: {...action.payload}
      }

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    
    case types.noteUpdated:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.payload.id ?
                                action.payload.note
                              :
                                note
                              )
      }
  
    default:
      return state;
  }
}