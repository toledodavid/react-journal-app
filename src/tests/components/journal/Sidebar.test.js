import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogoutAction } from '../../../actions/authActions';
import { startNewEntryNoteAction } from '../../../actions/notesActions';

import Sidebar from '../../../components/journal/Sidebar';

jest.mock('../../../actions/authActions', () => ({
  startLogoutAction: jest.fn(),
}));

jest.mock('../../../actions/notesActions', () => ({
  startNewEntryNoteAction: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'G6ZtyzKCKcXqHloVli6izS0t0Xg1',
    name: 'Juan'
  },
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

describe('Tests in <Sidebar /> component', () => {

  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('It should call startLogoutAction', () => {
    wrapper.find('.btn').prop('onClick')();
    expect(startLogoutAction).toHaveBeenCalled();
  });

  test('It should call startNewEntryNoteAction', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect(startNewEntryNoteAction).toHaveBeenCalled();
  });

});