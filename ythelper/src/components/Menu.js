import React from 'react'
import { NavLink } from 'react-router-dom'

class Menu extends React.Component {

  render() {
    const activeStyle = {
      backgroundColor: "grey"
    }
    return (
      <div>
        <NavLink exact to='/' activeStyle={activeStyle}>
          Home
        </NavLink>&nbsp;
        <NavLink exact to='/users' activeStyle={activeStyle}>
          Users
        </NavLink>&nbsp;
        <NavLink exact to='/recommended' activeStyle={activeStyle}>
          Recommended
        </NavLink>&nbsp;
        <NavLink exact to='/search' activeStyle={activeStyle}>
          Search
        </NavLink>&nbsp;
      </div>
    )
  }
}

export default Menu
