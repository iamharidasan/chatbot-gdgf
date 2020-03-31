import {
  CHAT_ADD,
  CHAT_INIT,
  CHAT_ERROR,
  CHAT_OLD,
  SHOW_TYPING
} from "../actions/types"

const initialState = {
  chat: null,
  typing: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SHOW_TYPING:
      return { ...state, typing: true }

    case CHAT_INIT:
      localStorage.setItem("session", payload.session)
      const messages = []
      payload.messages.map(message =>
        messages.push({ message: message.text.text[0], who: 0 })
      )
      localStorage.setItem("messages", JSON.stringify(messages))
      return { ...state, chat: messages, typing: false }

    case CHAT_OLD:
      return { ...state, chat: payload, typing: false }

    case CHAT_ADD:
      const oldChats = JSON.parse(localStorage.getItem("messages"))
      const newChat = { message: payload.queryText, who: 1 }
      oldChats.push(newChat)
      payload.fulfillmentMessages.map(message =>
        oldChats.push({ message: message.text.text[0], who: 0 })
      )
      localStorage.setItem("messages", JSON.stringify(oldChats))
      return { ...state, chat: oldChats, typing: false }

    case CHAT_ERROR:
      return { ...state, chat: null, typing: false }

    default:
      return state
  }
}
