import { LOGIN, LOGOUT, UPDATEBUDGET } from "./types";
import { saveUser, deleteUser } from "../apis/storage";

export const loginAction = (user, token) => async dispatch => {
  try {
    saveUser(user, token);
    dispatch({
      type: LOGIN,
      payload: { user, token }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutAction = () => async dispatch => {
  deleteUser();
  dispatch({
    type: LOGOUT
  });
};

export const updateBudgetAction = (budget) => async dispatch => {
  try{
    //console.log("Inside Redux"+budget);
    dispatch({
      type:UPDATEBUDGET,
      payload: budget
    })
  }
  catch(e){}
}
