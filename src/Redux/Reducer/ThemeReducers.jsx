import {
  ADD_NEW_MILESTONE_ERR,
  ADD_NEW_MILESTONE_REQUEST,
  ADD_NEW_MILESTONE_SUCCESS,
  GET_COLOR_ERR,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
  GET_MILESTONE_FIND_ERR,
  GET_MILESTONE_FIND_REQUEST,
  GET_MILESTONE_FIND_SUCCESS,
  GET_TEMPLATE_TYPE_ERR,
  GET_TEMPLATE_TYPE_REQUEST,
  GET_TEMPLATE_TYPE_SUCCESS,
  LOGIN_ERR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SUBMIT_FORM_ERR,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  TEMPLATE_LIST_FIND_BY_ID_ERR,
  TEMPLATE_LIST_FIND_BY_ID_REQUEST,
  TEMPLATE_LIST_FIND_BY_ID_SUCCESS,
  TEMPLATE_LIST_FIND_ERR,
  TEMPLATE_LIST_FIND_REQUEST,
  TEMPLATE_LIST_FIND_SUCCESS,
  USER_DETAILS_ERR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../Constants/ThemeConstants";

// get all milestone
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: action.payload,
      };
    case LOGIN_ERR:
      return {
        ...state,
        loginLoading: false,
        loginErr: action.payload,
      };
    default:
      return state;
  }
};

// get user details 
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        userDetailsLoading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetailsLoading: false,
        userDetailsSuccess: action.payload,
      };
    case USER_DETAILS_ERR:
      return {
        ...state,
        userDetailsLoading: false,
        userDetailsErr: action.payload,
      };
    default:
      return state;
  }
};

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

// add new milestone
export const addMileStoneReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_MILESTONE_REQUEST:
      return {
        ...state,
        addNewMilestoneLoading: true,
      };
    case ADD_NEW_MILESTONE_SUCCESS:
      return {
        ...state,
        addNewMilestoneLoading: false,
        addNewMilestoneSuccess: action.payload,
      };
    case ADD_NEW_MILESTONE_ERR:
      return {
        ...state,
        addNewMilestoneLoading: false,
        addNewMilestoneErr: action.payload,
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

// submit form reducer
export const submitFormReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
      return {
        ...state,
        submitFormLoading: true,
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        submitFormLoading: false,
        submitFormSuccess: action.payload,
      };
    case SUBMIT_FORM_ERR:
      return {
        ...state,
        submitFormLoading: false,
        submitFormErr: action.payload,
      };
    default:
      return state;
  }
};
