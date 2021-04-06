import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Tests in authReducer', () => {

  test('It should do login', () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'David'
      }
    }

    const state =  authReducer(initialState, action);
    
    expect(state).toEqual({uid: 'abc', name: 'David'});
  });

  test('It should do logout', () => {
    const initialState = {uid: 'abc', name: 'David'};

    const action = {
      type: types.logout
    }

    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test('It should not do any cnahge in the state', () => {
    const initialState = {uid: 'abc', name: 'David'};

    const action = {
      type: 'qwdniubniqus'
    }

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

});