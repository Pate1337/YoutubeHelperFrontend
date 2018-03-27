import React from 'react'
import { connect } from 'react-redux'

class Users extends React.Component {
  render() {
    return (
      <div>
        <h1>Käyttäjät</h1>
        <ul>
          {this.props.users.map(u => <li key={u.id}>
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