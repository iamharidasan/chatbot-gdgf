import { GET_LEADS, LEADS_ERROR } from "../actions/types"

const initialState = {
  leads: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_LEADS:
      return { ...state, loading: false, leads: payload }

    case LEADS_ERROR:
      return { ...state, loading: false, leads: null }

    default:
      return state
  }
}
