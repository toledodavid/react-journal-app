import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import { firebase } from '../../firebase/firebase-config';
import { loginAction } from '../../actions/authActions';
import AppRouter from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';


jest.mock('../../actions/authActions', () => ({
  loginAction: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: null
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Tests in <AppRouter />', () => {

  test('It should call login if user is authenticated', async () => {

    let user;

    await act(async () => {
      const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');

      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

    });
    
    expect(loginAction).toHaveBeenCalledWith(user.uid, user.displayName);
  });

});