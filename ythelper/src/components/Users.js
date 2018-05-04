import React from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { allUsersComments } from '../reducers/commentReducer'
import { Grid } from 'semantic-ui-react'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      userToShow: null
    }
  }

  showUser = async (id, event) => {
    event.preventDefault()
    console.log('Users.js lista onclickin id:', id)
    await allUsersComments(id)
    //console.log('USERS - ', result)
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
        <Grid>
        <Grid.Column>
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
            <Comments cuser={this.state.userToShow}/>
            <button onClick={this.hideUser}>Piilota</button>
        </Grid.Column>
        </Grid>
      )
    }
    return (

        <Grid>
        <Grid.Column>
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
        </Grid.Column>
        </Grid>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  //uutta
  allUsersComments
}
const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers
