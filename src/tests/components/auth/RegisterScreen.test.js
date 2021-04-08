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

});