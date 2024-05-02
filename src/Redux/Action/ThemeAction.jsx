import axios from "../../Axios/config";
import {
  GET_TEMPLATE_TYPE_ERR,
  GET_TEMPLATE_TYPE_REQUEST,
  GET_TEMPLATE_TYPE_SUCCESS,
  LIST_ALL_MILESTONE_ERR,
  LIST_ALL_MILESTONE_REQUEST,
  LIST_ALL_MILESTONE_SUCCESS,
  TEMPLATE_LIST_FIND_BY_ID_ERR,
  TEMPLATE_LIST_FIND_BY_ID_REQUEST,
  TEMPLATE_LIST_FIND_BY_ID_SUCCESS,
  TEMPLATE_LIST_FIND_ERR,
  TEMPLATE_LIST_FIND_REQUEST,
  TEMPLATE_LIST_FIND_SUCCESS,
} from "../Constants/ThemeConstants";

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

export const milstoneFindAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_ALL_MILESTONE_REQUEST });
    let isUserExist = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.access_token}`,
      },
    };

    let { data } = await axios.post(
      `api/company-milestones`,
      { company_id: id, type: 0 },
      config
    );

    dispatch({ type: LIST_ALL_MILESTONE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: LIST_ALL_MILESTONE_ERR,
      payload: error.data,
    });
  }
};

export const templateTypeFindAction = (id) => async (dispatch) => {
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

    let { data } = await axios.post(
      `api/template-types`,
      { company_id: id, type: 0, id: 0 },
      config
    );

    dispatch({ type: GET_TEMPLATE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error.response");
    dispatch({
      type: GET_TEMPLATE_TYPE_ERR,
      payload: error.data,
    });
  }
};
