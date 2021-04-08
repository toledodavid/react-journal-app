import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginAction, logoutAction, startLoginEmailPassword, startLogoutAction } from '../../actions/authActions';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);


describe('Tests in authActions', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login and logout should create respective actions', () => {
    const uid = 'ABC123';
    const displayName = 'David';

    const login = loginAction(uid, displayName);
    const logout = logoutAction();

    expect(login).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    });

    expect(logout).toEqual({
      type: types.logout
    });
  });

  test('It should do startLogoutAction', async () =>{
    await store.dispatch(startLogoutAction());
    const actions = store.getActions();

    expect(actions[0]).toEqual({type: types.notesLogoutCleaning});
    expect(actions[1]).toEqual({type: types.logout});
  });

  test('It should do startLoginEmailPassword', async () => {
    await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'G6ZtyzKCKcXqHloVli6izS0t0Xg1',
        displayName: null
      }
    });
  });

});