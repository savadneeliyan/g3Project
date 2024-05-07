import axios from "../../Axios/config";
import {
  ADD_NEW_MILESTONE_ERR,
  ADD_NEW_MILESTONE_REQUEST,
  ADD_NEW_MILESTONE_SUCCESS,
  GET_COLOR_ERR,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
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

export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let { data } = await axios.post("auth/login", formData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: LOGIN_ERR,
      payload: error.data,
    });
  }
};

export const userDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;
    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };
    let id = isUserExist?.user.id;

    let { data } = await axios.get(`api/user-profile/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: USER_DETAILS_ERR,
      payload: error.data,
    });
  }
};

export const milestoneFindAllAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MILESTONE_FIND_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };
    let info = {
      company_id: isUserExist?.company.id,
      type: 0,
    };

    let { data } = await axios.post("api/company-milestones", info, config);

    dispatch({ type: GET_MILESTONE_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: TEMPLATE_LIST_FIND_ERR,
      payload: error.data,
    });
  }
};

export const addNewMilestoneAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_MILESTONE_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };

    let { data } = await axios.post("api/milestones", formData, config);

    dispatch({ type: ADD_NEW_MILESTONE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: ADD_NEW_MILESTONE_ERR,
      payload: error.data,
    });
  }
};

export const templateFindAllAction = () => async (dispatch) => {
  try {
    dispatch({ type: TEMPLATE_LIST_FIND_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };

    let { data } = await axios.get("api/company/36/templates", config);

    dispatch({ type: TEMPLATE_LIST_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: TEMPLATE_LIST_FIND_ERR,
      payload: error.data,
    });
  }
};

export const templateFindOneByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEMPLATE_LIST_FIND_BY_ID_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };

    let { data } = await axios.get(`api/templates/${id}`, config);

    dispatch({ type: TEMPLATE_LIST_FIND_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: TEMPLATE_LIST_FIND_BY_ID_ERR,
      payload: error.data,
    });
  }
};

export const templateTypeFindAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TEMPLATE_TYPE_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };
    let info = {
      company_id: isUserExist?.company.id,
      type: 0,
      id: isUserExist?.user.id,
    };

    let { data } = await axios.post(`api/template-types`, info, config);

    dispatch({ type: GET_TEMPLATE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: GET_TEMPLATE_TYPE_ERR,
      payload: error.data,
    });
  }
};

export const getColorAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COLOR_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };
    let info = {
      company_id: isUserExist?.company.id,
      ids: [],
      type: 1,
    };

    let { data } = await axios.post(`api/colours`, info, config);

    dispatch({ type: GET_COLOR_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: GET_COLOR_ERR,
      payload: error.data,
    });
  }
};

export const formSubmitAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_FORM_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };

    let { data } = await axios.post(`api/templates`, formData, config);

    dispatch({ type: SUBMIT_FORM_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: SUBMIT_FORM_ERR,
      payload: error.data,
    });
  }
};
