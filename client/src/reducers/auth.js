import { LOGIN_USER, USER_LOAD, USER_ERROR, LOGOUT } from "../actions/types"

const initialState = {
  loading: true,
  token: null,
  isAuthenticated: false,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }

    case LOGIN_USER:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
      }

    case USER_ERROR:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      }
    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      }

    default:
      return state
  }
}
