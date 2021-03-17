import { types } from '../types/types';
/*
  {
    uid: 'sdanoui3noi2321243',
    name: 'David Toledo'
  }
*/


export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName
      };
    case types.logout:
      return {};
  
    default:
      return state;
  }
}