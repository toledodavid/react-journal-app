import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNoteAction, startDeletingNoteAction} from '../../../actions/notesActions';

import NoteScreen from '../../../components/notes/NoteScreen';



jest.mock('../../../actions/notesActions', () => ({
  activeNoteAction: jest.fn(),
  startDeletingNoteAction: jest.fn()
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
    active: {
      id: 1234,
      title: 'hola',
      body: 'mundo',
      date: 0
    }
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Tests in <NoteScreen /> component', () => {

  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('It should call activeNoteAction', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hello'
      }
    });

    expect(activeNoteAction).toHaveBeenCalled();
    expect(activeNoteAction).toHaveBeenLastCalledWith(1234, {
      body: 'mundo',
      title: 'Hello',
      id: 1234,
      date: 0
    });
  });

});