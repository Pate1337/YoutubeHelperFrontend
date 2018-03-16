import React from 'react'
import { connect } from 'react-redux'
import { addLoggedUser } from '../reducers/loggedUserReducer'

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
    /*Tässä vaiheessa ihan simppeli tarkistus jos kirjautuminen ei onnistu*/
    if (response !== 'error') {
      console.log('Logged in')
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
      </div>
    )
  }
}

const mapDispatchToProps = {
  addLoggedUser
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
