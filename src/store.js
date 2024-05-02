import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import {
  findTemplateByIdReducer,
  findTemplateListReducer,
  listAllMileStoneReducer,
  TemplateTypeFindReducer,
} from "./Redux/Reducer/ThemeReducers";

const appReducer = combineReducers({
  findTemplateList: findTemplateListReducer,
  findTemplateById: findTemplateByIdReducer,
  listAllMileStone: listAllMileStoneReducer,
  TemplateTypeFind: TemplateTypeFindReducer,
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
