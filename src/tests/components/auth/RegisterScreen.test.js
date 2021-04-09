import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import RegisterScreen from '../../../components/auth/RegisterScreen';

import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../../types/types';




const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Tests in <RegisterScreen /> component', () => {

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('It should dispatch the respective action', () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    });

    wrapper.find('form').simulate('submit', {preventDefault(){}});

    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid'
    });
  });

  test('It should show the alert with the error', () => {

    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid'
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
  });

});