import { GET_LEADS, LEADS_ERROR } from "./types"
import axios from "axios"

export const getLeads = () => async (dispatch) => {
  try {
    const leads = await axios.get("/api/db")
    dispatch({
      type: GET_LEADS,
      payload: leads.data,
    })
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: LEADS_ERROR,
    })
  }
}
