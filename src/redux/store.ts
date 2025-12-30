// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import initialStoreState from '../types/redux/store-type';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function configureStore(initialState: initialStoreState): any {
  let store;

  if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    store = createStore(
      reducers,
      initialState,
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(...middlewares)
      )
    );
  } else {
    store = createStore(
      reducers,
      initialState,
      applyMiddleware(...middlewares)
    );
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
