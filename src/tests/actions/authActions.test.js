import { loginAction, logoutAction } from '../../actions/authActions';
import { types } from '../../types/types';


describe('Tests in authActions', () => {

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

});