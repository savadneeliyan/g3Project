import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import {
  addMileStoneReducer,
  findTemplateByIdReducer,
  findTemplateListReducer,
  getColorReducer,
  getMileStoneReducer,
  loginReducer,
  submitFormReducer,
  TemplateTypeFindReducer,
  userDetailsReducer,
} from "./Redux/Reducer/ThemeReducers";

const appReducer = combineReducers({
  login: loginReducer,
  userDetails: userDetailsReducer,
  findTemplateList: findTemplateListReducer,
  findTemplateById: findTemplateByIdReducer,
  TemplateTypeFind: TemplateTypeFindReducer,
  getMileStone: getMileStoneReducer,
  addMileStone: addMileStoneReducer,
  getColor: getColorReducer,
  submitForm: submitFormReducer,
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
