import {
  GET_COLOR_ERR,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
  GET_MILESTONE_FIND_ERR,
  GET_MILESTONE_FIND_REQUEST,
  GET_MILESTONE_FIND_SUCCESS,
  GET_TEMPLATE_TYPE_ERR,
  GET_TEMPLATE_TYPE_REQUEST,
  GET_TEMPLATE_TYPE_SUCCESS,
  TEMPLATE_LIST_FIND_BY_ID_ERR,
  TEMPLATE_LIST_FIND_BY_ID_REQUEST,
  TEMPLATE_LIST_FIND_BY_ID_SUCCESS,
  TEMPLATE_LIST_FIND_ERR,
  TEMPLATE_LIST_FIND_REQUEST,
  TEMPLATE_LIST_FIND_SUCCESS,
} from "../Constants/ThemeConstants";

// get all milestone
export const getMileStoneReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MILESTONE_FIND_REQUEST:
      return {
        ...state,
        milestoneFindAllLoading: true,
      };
    case GET_MILESTONE_FIND_SUCCESS:
      return {
        ...state,
        milestoneFindAllLoading: false,
        milestoneFindAllSuccess: action.payload,
      };
    case GET_MILESTONE_FIND_ERR:
      return {
        ...state,
        milestoneFindAllLoading: false,
        milestoneFindAllErr: action.payload,
      };
    default:
      return state;
  }
};

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

// get color reducer
export const getColorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COLOR_REQUEST:
      return {
        ...state,
        getColorLoading: true,
      };
    case GET_COLOR_SUCCESS:
      return {
        ...state,
        getColorLoading: false,
        getColorSuccess: action.payload,
      };
    case GET_COLOR_ERR:
      return {
        ...state,
        getColorLoading: false,
        getColorErr: action.payload,
      };
    default:
      return state;
  }
};
