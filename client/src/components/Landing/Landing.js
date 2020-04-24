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
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-lg-6 offset-lg-3"
            style={{ paddingTop: "130px" }}
          >
            <h1 className="mt-0 mb-1 text-center">Become an Influencestar</h1>
            {messages ? (
              <Header data={messages} typing={typing} />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Landing.propTypes = {
  initChat: PropTypes.func.isRequired,
  messages: PropTypes.array,
  typing: PropTypes.bool.isRequired,
  oldChat: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  messages: state.chats.chat,
  typing: state.chats.typing,
})

export default connect(mapStateToProps, { initChat, oldChat })(Landing)
