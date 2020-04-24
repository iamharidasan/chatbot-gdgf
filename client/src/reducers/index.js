import { combineReducers } from "redux"
import chats from "./chats"
import auth from "./auth"
import leads from "./leads"

export default combineReducers({
  chats,
  auth,
  leads,
})
