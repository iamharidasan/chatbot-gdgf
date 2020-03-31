import React, { useRef } from "react"
import influncerLogo from "./influencer.png"
import { getChat } from "../../actions/chats"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Header = ({ data, typing, getChat }) => {
  const entered = e => {
    if (e.key === "Enter") {
      getChat(e.target.value)
      e.target.value = ""
      scrollToBottom()
    }
  }
  const el = useRef(null)
  const scrollToBottom = () => {
    el.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <header>
      <div className="header-bottom">
        <img
          src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/banner.jpg"
          width="100%"
          className="desk_banner"
          alt="slider"
        />
        <img
          src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/0811Mobile-bannernew.png"
          width="100%"
          className="mobile_banner"
          alt="slider"
        />

        <div className="banner_content pro_bold ft_43">
          INFLUENCER.IN- <br />
          <span className="ft_32">
            Powered by data, designed <br />
            for convenience
          </span>
        </div>
        <div
          className="banner_form"
          style={{ padding: "10px", width: "440px" }}
        >
          <h1 className="pro_bold text_center ft_20">
            Create <span className="ft_28 pro_bold">VIRAL</span> and captivating
            content for
            <br />
            your <span className="ft_28 pro_bold">BRAND</span> with{" "}
            <span className="ft_28 pro_bold">25,000</span> influencers
          </h1>
          <div className="messages" style={{ height: "300px" }}>
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
        <div className="banner_border"></div>
        <div className="banner_plane">
          <img
            src="https://www.influencer.in/wp-content/themes/influencer/LP-tiktok-templates/img/banner_plane.png"
            className="plane_display"
            width="100%"
            alt="slider"
          />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  getChat: PropTypes.func.isRequired,
  typing: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
}

export default connect(null, { getChat })(Header)
