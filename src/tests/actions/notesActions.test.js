/** * @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotesAction, startNewEntryNoteAction, startSaveNoteAction } from '../../actions/notesActions';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'UIDTESTING'
  }
}

let store = mockStore(initState);

describe('Tests in notesActions', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

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

  test('startLoadingNotesAction should load notes from firebase', async () => {
    await store.dispatch(startLoadingNotesAction('UIDTESTING'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({type: types.notesLoad, payload: expect.any(Array)});

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNoteAction should update note', async () => {
    const note = {
      id: '3wGa20I7H4NzBAafDGvF',
      title: 'titulo',
      body: 'Descripcion'
    };

    await store.dispatch(startSaveNoteAction(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.noteUpdated);

    const docRef = await db.doc(`/UIDTESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);

  });

});