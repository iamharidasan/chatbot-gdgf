import {
  CHAT_ADD,
  CHAT_INIT,
  CHAT_ERROR,
  CHAT_OLD,
  SHOW_TYPING,
  CHAT_ADD_USER
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
      payload.fulfillmentMessages.map(message =>
        oldChats.push({ message: message.text.text[0], who: 0 })
      )
      localStorage.setItem("messages", JSON.stringify(oldChats))
      return { ...state, chat: oldChats, typing: false }

    case CHAT_ADD_USER:
      const oldChatsUser = JSON.parse(localStorage.getItem("messages"))
      const userChat = { message: payload, who: 1 }
      oldChatsUser.push(userChat)
      localStorage.setItem("messages", JSON.stringify(oldChatsUser))
      return { ...state, chat: oldChatsUser, typing: false }

    case CHAT_ERROR:
      return { ...state, chat: null, typing: false }

    default:
      return state
  }
}
