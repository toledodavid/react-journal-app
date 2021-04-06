import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewEntryNoteAction } from '../../actions/notesActions';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: 'UIDTESTING'
  }
});

describe('Tests in notesActions', () => {

  test('It should create a new note - startNewEntryNoteAction', async () => {
    await store.dispatch(startNewEntryNoteAction());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.noteActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNewEntry,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    const docId = actions[0].payload.id;
    await db.doc(`/UIDTESTING/journal/notes/${docId}`).delete();
  });

});