import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import {
  findTemplateByIdReducer,
  findTemplateListReducer,
  getColorReducer,
  getMileStoneReducer,
  TemplateTypeFindReducer,
} from "./Redux/Reducer/ThemeReducers";

const appReducer = combineReducers({
  findTemplateList: findTemplateListReducer,
  findTemplateById: findTemplateByIdReducer,
  TemplateTypeFind: TemplateTypeFindReducer,
  getMileStone: getMileStoneReducer,
  getColor: getColorReducer,
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
