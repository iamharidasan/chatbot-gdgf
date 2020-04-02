import React, { useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import { initChat, oldChat } from "../../actions/chats"
import { connect } from "react-redux"
import Header from "../Common/Header"
import Spinner from "../Common/Spinner"

const Landing = ({ initChat, messages, typing, oldChat }) => {
  useEffect(() => {
    const localMessages = localStorage.getItem("messages")
    if (localMessages === null) {
      initChat()
    } else {
      oldChat()
    }
  }, [initChat, oldChat])
  return (
    <Fragment>
      {messages ? <Header data={messages} typing={typing} /> : <Spinner />}
    </Fragment>
  )
}

Landing.propTypes = {
  initChat: PropTypes.func.isRequired,
  messages: PropTypes.array,
  typing: PropTypes.bool.isRequired,
  oldChat: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  messages: state.chats.chat,
  typing: state.chats.typing
})

export default connect(mapStateToProps, { initChat, oldChat })(Landing)
