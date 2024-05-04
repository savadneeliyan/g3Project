import axios from "../../Axios/config";
import {
  GET_COLOR_ERR,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
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
