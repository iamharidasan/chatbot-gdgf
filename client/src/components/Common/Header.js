import React, { useRef, Fragment } from "react"
import influncerLogo from "./influencer.png"
import { getChat } from "../../actions/chats"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Header = ({ data, typing, getChat }) => {
  const entered = e => {
    if (e.key === "Enter") {
      getChat(e.target.value)
      e.target.value = ""
      setTimeout(scrollToBottom(), 1500)
    }
  }
  const el = useRef(null)
  const scrollToBottom = () => {
    el.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div
            className="col-xs-12 col-lg-6 col-lg-offset-3"
            style={{ paddingTop: "150px" }}
          >
            <div className="messages" style={{ height: "calc(100vh - 250px)" }}>
              <ul className="list-unstyled mt-2">
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
                {typing && "Typing..."}
                <li
                  style={{ float: "left", clear: "both", margin: 0 }}
                  ref={el}
                ></li>
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
          </div>
        </div>
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
