
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
    isLoggedIn: false,
    user: {}
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;