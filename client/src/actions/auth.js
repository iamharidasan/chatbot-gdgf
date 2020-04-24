import axios from "axios"
import { LOGIN_USER, USER_LOAD, USER_ERROR, LOGOUT } from "./types"
import setAuthToken from "../utils/setAuthToken"

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get("/api/auth")
    dispatch({
      type: USER_LOAD,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    })
  }
}

//Login User
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  const body = {
    email: email,
    password: password,
  }
  try {
    const res = await axios.post("/api/auth/login", body, config)
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
    })
  }
}

//Logout
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}
