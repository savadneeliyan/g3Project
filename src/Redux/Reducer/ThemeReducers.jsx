
import { GET_TEMPLATE_TYPE_ERR, GET_TEMPLATE_TYPE_REQUEST, GET_TEMPLATE_TYPE_SUCCESS, LIST_ALL_MILESTONE_ERR, LIST_ALL_MILESTONE_REQUEST, LIST_ALL_MILESTONE_SUCCESS, TEMPLATE_LIST_FIND_BY_ID_ERR, TEMPLATE_LIST_FIND_BY_ID_REQUEST, TEMPLATE_LIST_FIND_BY_ID_SUCCESS, TEMPLATE_LIST_FIND_ERR, TEMPLATE_LIST_FIND_REQUEST, TEMPLATE_LIST_FIND_SUCCESS } from "../Constants/ThemeConstants";

// find all template reducer
export const findTemplateListReducer = (state = {}, action) => {
  switch (action.type) {
    case TEMPLATE_LIST_FIND_REQUEST:
      return {
        ...state,
        templateListFindAllLoading: true,
      };
    case TEMPLATE_LIST_FIND_SUCCESS:
      return {
        ...state,
        templateListFindAllLoading: false,
        templateListFindAllSuccess: action.payload,
      };
    case TEMPLATE_LIST_FIND_ERR:
      return {
        ...state,
        templateListFindAllLoading: false,
        templateListFindAllErr: action.payload,
      };
    default:
      return state;
  }
};

// single page edit template by id reducer
export const findTemplateByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case TEMPLATE_LIST_FIND_BY_ID_REQUEST:
      return {
        ...state,
        templateListFindByIdLoading: true,
      };
    case TEMPLATE_LIST_FIND_BY_ID_SUCCESS:
      return {
        ...state,
        templateListFindByIdLoading: false,
        templateListFindByIdSuccess: action.payload,
      };
    case TEMPLATE_LIST_FIND_BY_ID_ERR:
      return {
        ...state,
        templateListFindByIdLoading: false,
        templateListFindByIdErr: action.payload,
      };
    default:
      return state;
  }
};

// list all milestone reducer
export const listAllMileStoneReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_ALL_MILESTONE_REQUEST:
      return {
        ...state,
        milestoneFindAllLoading: true,
      };
    case LIST_ALL_MILESTONE_SUCCESS:
      return {
        ...state,
        milestoneFindAllLoading: false,
        milestoneFindAllSuccess: action.payload,
      };
    case LIST_ALL_MILESTONE_ERR:
      return {
        ...state,
        milestoneFindAllLoading: false,
        milestoneFindAllErr: action.payload,
      };
    default:
      return state;
  }
};

// template type reducer
export const TemplateTypeFindReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEMPLATE_TYPE_REQUEST:
      return {
        ...state,
        getTemplateTypeLoading: true,
      };
    case GET_TEMPLATE_TYPE_SUCCESS:
      return {
        ...state,
        getTemplateTypeLoading: false,
        getTemplateTypeSuccess: action.payload,
      };
    case GET_TEMPLATE_TYPE_ERR:
      return {
        ...state,
        getTemplateTypeLoading: false,
        getTemplateTypeErr: action.payload,
      };
    default:
      return state;
  }
};
