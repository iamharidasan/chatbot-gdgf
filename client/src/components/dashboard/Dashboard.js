import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Footer from "./Common/Footer"
import Nav from "./Common/Nav"
import Header from "./Common/Header"
import Routes from "./Routes/Routes"
import Loader from "../Common/Spinner"
import { loadUser } from "../../actions/auth"
import "./assets/css/all.min.css"
import "./assets/css/adminlte.min.css"

const Dashboard = ({ isAuthenticated, loading, loadUser }) => {
  useEffect(() => {
    loadUser()
    document.body.classList.add("layout-fixed")
    document.body.classList.add("sidebar-mini")
  }, [loadUser])
  if (loading) {
    return <Loader />
  } else {
    if (!isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="wrapper">
        <Header />
        <Nav />
        <Routes />
        <Footer />
      </div>
    )
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})

export default connect(mapStateToProps, { loadUser })(Dashboard)
