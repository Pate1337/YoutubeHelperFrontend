import React from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { allUsersComments } from '../reducers/commentReducer'
import { Grid } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      userToShow: null,
      comments: null,
      usersearch: ''
    }
  }

  componentDidMount() {
    this.props.setActiveItem('/users')
  }

  showUser = async (id, event) => {
    event.preventDefault()
    const allcomments = await this.props.allUsersComments(id)
    this.setState({
      userToShow: id,
      comments: allcomments
    })
  }

  hideUser = (event) => {
    this.setState({
      userToShow: null
    })
  }

  handleUserSearch = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (this.state.userToShow != null) {
      return (
        <Grid>
          <Grid.Column>
            <h2>Käyttäjät</h2>
            <form>
              <input
                type='text'
                name='usersearch'
                value={this.state.usersearch}
                onChange={this.handleUserSearch}
              />
              <button type='submit'>Search</button>
            </form>
            <ul>
              {this.props.users.filter(user => user.username
                .includes(this.state.usersearch))
                .map(u => <li key={u.id} onClick={(event) => this.showUser(u.id, event)}>
                username: {u.username},
                id: {u.id},
                name: {u.name},
                linkkien määrä: {u.links.length},
                soittolistojen määrä: {u.playlists.length}
              </li>
              )}
            </ul>

            <h3>Näytettävä Käyttäjä</h3>
            <p>{this.state.userToShow}<br/>
              {this.props.users
              .filter(user => user.id == this.state.userToShow)[0].username}</p>
            <Comments cuser={this.state.userToShow} comments={this.state.comments} />
            <button onClick={this.hideUser}>Piilota</button>
          </Grid.Column>
        </Grid>
      )
    }
    return (
      <Grid>
        <Grid.Column>
          <h1>Käyttäjät</h1>
          <form>
            <input
              type='text'
              name='usersearch'
              value={this.state.usersearch}
              onChange={this.handleUserSearch}
            />
            <button type='submit'>Search</button>
          </form>
          <ul>
            {this.props.users.filter(user => user.username
              .includes(this.state.usersearch))
              .map(u => <li key={u.id} onClick={(event) => this.showUser(u.id, event)}>
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
  allUsersComments,
  setActiveItem
}
const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers
