import { types } from '../types/types';


export const setErrorAction = (msgError) => ({
  type: types.uiSetError,
  payload: msgError
});

export const removeErrorAction = () => ({
  type: types.uiRemoveError
});

export const startLoadingAction = () => ({
  type: types.uiStartLoading
});

export const finishLoadingAction = () => ({
  type: types.uiFinishLoading
});