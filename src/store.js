
import rootReducer from "./reducers";
import { createStore } from 'redux';


const initialState = {
    isLoggedIn: false,
    user: {}
};

const store = createStore(
  rootReducer,
  initialState
);
export default store;