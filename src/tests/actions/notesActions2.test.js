import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingImageAction } from '../../actions/notesActions';
import { fileUpload } from '../../helpers/fileUpload';

 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hola-mundo/cosa.jpg'
  })
}));


const initState = {
  auth: {
    uid: 'UIDTESTING'
  },
  notes: {
    active: {
      id: '3wGa20I7H4NzBAafDGvF',
      title: 'Hola',
      body: 'Mundo'
    }
  }
}

let store = mockStore(initState);

global.scrollTo = jest.fn(); 

describe('Tests in notesActions', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('startLoadingImageAction should update url from note entry', async () => {
    const file = new File([], 'foto.jpg');
    await store.dispatch(startLoadingImageAction(file));
  });

})