import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import remindersReducer from '../reducers/remindersSlice';
import snackbarReducer from '../reducers/snackbarSlice';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

function getStore(reducer) {
  const store = createStore(reducer, initialState, composedEnhancers);
  return store;
}

const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    snackbar: snackbarReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
