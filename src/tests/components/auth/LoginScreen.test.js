import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LoginScreen from '../../../components/auth/LoginScreen';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLoginAction, startLoginEmailPassword } from '../../../actions/authActions';


jest.mock('../../../actions/authActions', () => ({
  startGoogleLoginAction: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);


describe('Tests in <LoginScreen /> component', () => {

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('It should dispatch startGoogleLoginAction', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLoginAction).toHaveBeenCalled();
  });

  test('It should dispatch startLoginEmailPassword with email and password', () => {
    wrapper.find('form').prop('onSubmit')({preventDefault(){}});

    expect(startLoginEmailPassword).toHaveBeenCalledWith('alex0@gmail.com', '123456');
  });
});