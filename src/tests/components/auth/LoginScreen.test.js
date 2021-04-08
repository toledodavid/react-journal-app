import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LoginScreen from '../../../components/auth/LoginScreen';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';


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
  });

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});