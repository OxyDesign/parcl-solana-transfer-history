import { configureStore } from '@reduxjs/toolkit';
import { defaultState } from './defaultState';

function appReducer(state = defaultState, action: any = {}) {
  switch (action.type) {
    case 'RESET':
      return defaultState;

    default:
      return state;
  }
}

const store = configureStore({ reducer: appReducer });

export default store;
