import {
  CHAT_ADD,
  CHAT_INIT,
  CHAT_ERROR,
  CHAT_OLD,
  SHOW_TYPING,
  CHAT_ADD_USER,
} from "../actions/types"

const initialState = {
  chat: null,
  typing: true,
  options: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SHOW_TYPING:
      return { ...state, typing: true }

    case CHAT_INIT:
      localStorage.setItem("session", payload.session)
      localStorage.setItem("messages", JSON.stringify(payload.messages))
      return { ...state, chat: payload.messages, typing: false }

    case CHAT_OLD:
      return { ...state, chat: payload, typing: false }

    case CHAT_ADD:
      const oldChats = JSON.parse(localStorage.getItem("messages"))
      let currentMessage = ""
      payload.fulfillmentMessages.map((message) => {
        currentMessage = message.text.text[0]
        return oldChats.push({ message: message.text.text[0], who: 0 })
      })
      console.log(oldChats)
      let option = false
      if (
        currentMessage === "Please pick one more category" ||
        currentMessage.includes("what category suits your talent?")
      ) {
        option = true
      }
      localStorage.setItem("messages", JSON.stringify(oldChats))
      //console.log(payload.parameters.fields)
      return { ...state, chat: oldChats, typing: false, options: option }

    case CHAT_ADD_USER:
      const oldChatsUser = JSON.parse(localStorage.getItem("messages"))
      const userChat = { message: payload, who: 1 }
      oldChatsUser.push(userChat)
      localStorage.setItem("messages", JSON.stringify(oldChatsUser))
      return { ...state, chat: oldChatsUser, options: false }

    case CHAT_ERROR:
      return { ...state, chat: null, typing: false, options: false }

    default:
      return state
  }
}
