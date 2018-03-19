import React from 'react'
import { connect } from 'react-redux'
import { addNewUser } from '../reducers/userReducer'

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: '',
      password: ''
    }
  }

  handleRegisterFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegistering = async (event) => {
    console.log('handleRegistering RegisterForm')
    event.preventDefault()
    const user = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    }
    if(user.username.length < 5 || user.password.length < 8) {
      console.log('Username must be >4 chars and password >7')
    } else {
      const response = await this.props.addNewUser(user)
      this.setState({
        username: '',
        name: '',
        password: ''
      })
    }
  }

  render() {
    console.log('Renderöidään uuden käyttäjän rekisteröinti formi')
    return (
      <div>
        <h2>Register a new user</h2>
        <form onSubmit={this.handleRegistering}>
          Username:
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleRegisterFieldChange}
            />
          Name:
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleRegisterFieldChange}
            />
          Password:
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleRegisterFieldChange}
            />
          <button type='submit'>
            Register
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addNewUser
}

const ConnectedRegisterForm = connect(null, mapDispatchToProps)(RegisterForm)

export default ConnectedRegisterForm
