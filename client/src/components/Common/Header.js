import React, { Fragment } from "react"
import influncerLogo from "./influencer.png"
import { getChat } from "../../actions/chats"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useEffect } from "react"

const scrollToRef = () => {
  document.getElementById("LastID").scrollIntoView({ behavior: "smooth" })
  //alert("Called")
}

const Header = ({ data, typing, getChat }) => {
  useEffect(() => {
    scrollToRef()
  }, [])
  const entered = e => {
    if (e.key === "Enter") {
      getChat(e.target.value, scrollToRef)
      e.target.value = ""
      //scrollToRef()
    }
  }

  return (
    <Fragment>
      <div className="messages" style={{ height: "calc(100vh - 250px)" }}>
        <ul id="messagesList" className="list-unstyled mt-2">
          {data.map((item, index) => {
            let firstClassName = "sent"
            let url = influncerLogo
            if (item.who === 1) {
              firstClassName = "replies"
              url = "http://placehold.it/50/FA6F57/fff&text=ME"
            }
            return (
              <li key={index} className={firstClassName}>
                <img src={url} alt="" />
                <p>{item.message}</p>
              </li>
            )
          })}
          {typing && (
            <li className="sent">
              <img src={influncerLogo} alt="" />
              <p>Typing...</p>
            </li>
          )}
          <li id="LastID"></li>
        </ul>
      </div>
      <div className="w-100">
        <input
          type="text"
          name="chat"
          id="chat"
          placeholder="Type and Press Enter"
          onKeyPress={e => entered(e)}
          className="form-control"
        />
      </div>
    </Fragment>
  )
}

Header.propTypes = {
  getChat: PropTypes.func.isRequired,
  typing: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
}

export default connect(null, { getChat })(Header)
