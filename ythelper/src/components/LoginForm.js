import React from 'react'
import { connect } from 'react-redux'
import { addLoggedUser } from '../reducers/loggedUserReducer'
/*import { usersFavourites } from '../reducers/favouriteLinksReducer'
import { usersPlaylists } from '../reducers/playlistsReducer'*/
import { userLinks } from '../reducers/userLinksReducer'
import { setActiveItem } from '../reducers/menuReducer'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    console.log('handleLogin LoginForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    const response = await this.props.addLoggedUser(user)
    /*this.props.usersFavourites()
    this.props.usersPlaylists()*/
    this.props.userLinks()
    /*Tässä vaiheessa ihan simppeli tarkistus jos kirjautuminen ei onnistu*/
    if (response !== 'error') {
      console.log('Logged in')
      this.props.history.push('/')
      await this.props.setActiveItem('home')
    } else {
      this.setState({
        username: '',
        password: ''
      })
    }
  }

  render() {
    console.log('Rendering LoginForm')
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          Username:
          <input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
          Password:
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
          <button type='submit'>
            Login
          </button>
        </form>
        <button onClick={() => this.props.history.push('/')}>
          Hide
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addLoggedUser,
  /*usersFavourites,
  usersPlaylists*/
  userLinks,
  setActiveItem
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
