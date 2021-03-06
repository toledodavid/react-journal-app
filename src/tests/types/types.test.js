import { types } from "../../types/types";



describe('Tests with types', () => {
  test('It should has these types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNewEntry: '[Notes] New note',
      noteActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      noteUpdated: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image url',
      noteDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning'
    });
  });
});
