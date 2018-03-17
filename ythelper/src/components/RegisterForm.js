import React from 'react'
import { connect } from 'react-redux'
import { addNewUser } from '../reducers/userReducer'

class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            password: ''
        }
    }

    render() {
        console.log('Renderöidään uuden käyttäjän rekisteröinti formi')
        return (
            <div>
                <h2>Register a new user</h2>
                <form>
                    Username:
                    <input
                        type='text'
                        name='username'
                    />
                    Password:
                    <input
                        type='password'
                        name='password'
                    />
                    <button type='submit'>
                        Register
                    </button>
                </form>
            </div>
        )
    }
}

export default RegisterForm

