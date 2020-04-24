import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logOut } from "../../../actions/auth"

const Header = ({ user, logOut }) => {
  const [navigationState, setNavigationState] = useState(true)

  const [dropDownState, setDropDownState] = useState(true)

  const navigationToggleHandler = () => {
    const doesShow = navigationState
    if (navigationState) {
      document.body.classList.add("sidebar-collapse")
    } else {
      document.body.classList.remove("sidebar-collapse")
    }
    setNavigationState(!doesShow)
  }

  const dropDownToggleHandler = () => {
    const doesShow = dropDownState
    if (dropDownState) {
      document.getElementById("dropDown").classList.add("show")
    } else {
      document.getElementById("dropDown").classList.remove("show")
    }
    setDropDownState(!doesShow)
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            href="!#"
            onClick={(e) => {
              e.preventDefault()
              navigationToggleHandler()
            }}
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link"
            href="!#"
            onClick={(e) => {
              e.preventDefault()
              dropDownToggleHandler()
            }}
          >
            <i className="fas fa-user"></i>
            {user && ` ${user.email}`}
          </a>
          <div
            id="dropDown"
            onClick={dropDownToggleHandler}
            className="dropdown-menu dropdown-menu-right"
          >
            <button onClick={logOut} className="dropdown-item">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { logOut })(Header)
