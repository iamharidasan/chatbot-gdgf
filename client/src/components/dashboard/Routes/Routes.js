import React, { Fragment, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Loader from "../../Common/Spinner"
import Moment from "react-moment"
import Breadcrumb from "../Common/Breadcrumb"
import { getLeads } from "../../../actions/leads"

const Routes = ({ user, leads, getLeads }) => {
  useEffect(() => {
    getLeads()
  }, [])
  return (
    <div className="content-wrapper">
      <Breadcrumb title="View Leads" />
      {user ? (
        <Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List of chatbots</h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-head-fixed table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Category</th>
                          <th>Second Category</th>
                          <th>Tik Tok Username</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads && leads.length > 0 ? (
                          leads.map((lead, index) => (
                            <tr key={index}>
                              <td>{lead.chatFields.name}</td>
                              <td>{lead.chatFields.email}</td>
                              <td>{lead.chatFields.mobile}</td>
                              <td>{lead.chatFields.category}</td>
                              <td>{lead.chatFields.secondaryCategory}</td>
                              <td>{lead.chatFields.tiktokusername}</td>
                              <td>{lead.date && lead.date}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" align="center">
                              No Entries
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Loader />
      )}
    </div>
  )
}

Routes.propTypes = {
  user: PropTypes.object,
  leads: PropTypes.array,
  getLeads: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  leads: state.leads.leads,
})

export default connect(mapStateToProps, { getLeads })(Routes)
