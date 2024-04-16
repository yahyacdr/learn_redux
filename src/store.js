import { applyMiddleware, combineReducers, createStore } from "redux";
import composeWithDevTools from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import {
  createCustomer,
  updateName,
  customerReducer,
} from "./features/customers/customerSlice";
import accountReducer from "./features/account/accountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
