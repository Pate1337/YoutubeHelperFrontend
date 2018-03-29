import React from 'react'
import { connect } from 'react-redux'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      userToShow: null
    }
  }

  showUser = (id, event) => {
    event.preventDefault()
    console.log('Users.js lista onclickin id:', id)
    this.setState({
      userToShow: id
    })
  }

  hideUser = (event) => {
    console.log('User.js hideUser')
    this.setState({
      userToShow: null
    })
  }

  render() {
    if(this.state.userToShow != null) {
      return (
        <div>
          <h2>Käyttäjät</h2>
          <ul>
            {this.props.users.map(u => <li key={u.id} onClick={(event) => this.showUser(u.id, event)}>
              username: {u.username},
                id: {u.id},
                name: {u.name},
                linkkien määrä: {u.links.length},
                soittolistojen määrä: {u.playlists.length}
            </li>
            )}
          </ul>

          <h3>Näytettävä Käyttäjä</h3>
            <p>{this.state.userToShow}</p>
            <button onClick={this.hideUser}>Piilota</button>
        </div>
      )
    }
    return (
      <div>
        <h1>Käyttäjät</h1>
        <ul>
          {this.props.users.map(u => <li key={u.id} onClick={(event) => this.showUser(u.id, event)}>
            username: {u.username},
              id: {u.id},
              name: {u.name},
              linkkien määrä: {u.links.length},
              soittolistojen määrä: {u.playlists.length}
          </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {

}
const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers
