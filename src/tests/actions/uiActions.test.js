import { finishLoadingAction, removeErrorAction, setErrorAction, startLoadingAction } from '../../actions/uiActions';
import { types } from '../../types/types';


describe('Tests in uiActions', () => {
  test('All actions should work', () => {
    const setError = setErrorAction('HELP!!!');

    expect(setError).toEqual({type: types.uiSetError, payload: 'HELP!!!'})

    const removeError = removeErrorAction();
    expect(removeError).toEqual({type: types.uiRemoveError});

    const startLoading = startLoadingAction();
    expect(startLoading).toEqual({type: types.uiStartLoading});

    const finishLoading = finishLoadingAction();
    expect(finishLoading).toEqual({type: types.uiFinishLoading});
  });
});