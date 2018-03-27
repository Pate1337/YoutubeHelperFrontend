import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {

  render() {
    return(
      <div>
        <p> Testi </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users
  }
}

const mapDispatchToProps = {

}

ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)

export default ConnectedUser