import { CHAT_INIT, CHAT_ADD, CHAT_ERROR, CHAT_OLD, SHOW_TYPING } from "./types"
import axios from "axios"
import { v4 } from "uuid"

export const initChat = () => async dispatch => {
  try {
    let session = localStorage.getItem("session")
    if (session === null) {
      session = v4()
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      const chatData = {
        projectId: "influencertiktok-llneow",
        reqText: "Hi",
        sessionId: session
      }
      const res = await axios.post("/api/dialogflow", chatData, config)
      const response = {
        messages: res.data,
        session: session
      }
      dispatch({
        type: CHAT_INIT,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: CHAT_ERROR
    })
  }
}

export const getChat = message => async dispatch => {
  try {
    dispatch({
      type: SHOW_TYPING
    })
    const session = localStorage.getItem("session")
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    const chatData = {
      projectId: "influencertiktok-llneow",
      reqText: message,
      sessionId: session
    }
    const res = await axios.post("/api/dialogflow/fullset", chatData, config)
    dispatch({
      type: CHAT_ADD,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR
    })
  }
}

export const oldChat = () => dispatch => {
  try {
    const messages = localStorage.getItem("messages")
    dispatch({
      type: CHAT_OLD,
      payload: JSON.parse(messages)
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR
    })
  }
}
