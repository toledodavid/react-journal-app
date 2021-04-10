import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNoteAction } from '../../../actions/notesActions';

import JournalEntry from '../../../components/journal/JournalEntry';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'Hello',
  body: 'world',
  url: 'https://somepage.com/foro.jpg'
};


describe('Tests in <JournalEntry /> component', () => {

  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...note} />
    </Provider>
  );

  test('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('It should active note', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(activeNoteAction(note.id, {...note}));
  });

});