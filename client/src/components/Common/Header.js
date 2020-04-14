import React, { Fragment, useEffect, useState } from "react"
import influncerLogo from "./influencer.png"
import { getChat } from "../../actions/chats"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const scrollToRef = () => {
  document.getElementById("LastID").scrollIntoView({ behavior: "smooth" })
}

const Header = ({ data, typing, getChat, options }) => {
  useEffect(() => {
    scrollToRef()
  }, [])
  const [enableBtn, setEnableBtn] = useState({
    enabled: false,
  })
  const entered = (e) => {
    if (e.target.value !== "") {
      console.log("Enabled")
      setEnableBtn({
        enabled: true,
      })
    } else {
      console.log("Disabled")
      setEnableBtn({
        enabled: false,
      })
    }
    if (e.key === "Enter") {
      getChat(e.target.value, scrollToRef)
      e.target.value = ""
      //scrollToRef()
    }
  }

  const { enabled } = enableBtn

  const btnClicked = () => {
    getChat(document.getElementById("chat").value, scrollToRef)
  }
  useEffect(() => {
    scrollToRef()
  }, [data])

  let disabled = "true"
  if (enabled) {
    disabled = ""
  } else {
    disabled = "true"
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
      {options ? (
        <div className="w-100 options">
          <button onClick={(e) => getChat("Fashion", scrollToRef)}>
            Fashion
          </button>
          <button onClick={(e) => getChat("Lifestyle", scrollToRef)}>
            Lifestyle
          </button>
          <button onClick={(e) => getChat("Travel", scrollToRef)}>
            Travel
          </button>
          <button onClick={(e) => getChat("Food", scrollToRef)}>Food</button>
          <button onClick={(e) => getChat("Health and Wellness", scrollToRef)}>
            Health and Wellness
          </button>
          <button onClick={(e) => getChat("Fitness", scrollToRef)}>
            Fitness
          </button>
          <button onClick={(e) => getChat("Comedy", scrollToRef)}>
            Comedy
          </button>
          <button onClick={(e) => getChat("Tech", scrollToRef)}>Tech</button>
          <button onClick={(e) => getChat("Parenting", scrollToRef)}>
            Parenting
          </button>
          <button onClick={(e) => getChat("Education", scrollToRef)}>
            Education
          </button>
          <button onClick={(e) => getChat("Gaming", scrollToRef)}>
            Gaming
          </button>
          <button onClick={(e) => getChat("Automobile", scrollToRef)}>
            Automobile
          </button>
          <button onClick={(e) => getChat("Other", scrollToRef)}>Other</button>
        </div>
      ) : (
        <div className="w-100">
          <input
            type="text"
            name="chat"
            id="chat"
            placeholder="Type and Press Enter"
            onKeyUp={(e) => entered(e)}
            className="form-control"
            style={{ display: "inline-block", width: "calc(100% - 30px)" }}
          />
          <button
            onClick={(e) => btnClicked()}
            style={{
              width: "30px",
              border: "none",
              backgroundColor: "white",
              padding: "6px 0",
            }}
            disabled={disabled}
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      )}
    </Fragment>
  )
}

Header.propTypes = {
  getChat: PropTypes.func.isRequired,
  typing: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  options: state.chats.options,
})

export default connect(mapStateToProps, { getChat })(Header)
