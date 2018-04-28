import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuItem, Segment } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'
import { connect } from 'react-redux'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'home'
    }
  }
  handleItemClick = async (event, { name }) => {
    console.log('name = ' + name)
    this.setState({
      activeItem: name
    })
    /*await this.props.setActiveItem(name)*/
    let address = '/' + name
    if (name === 'home') {
      address = '/'
    }
    this.props.history.push(address)
  }
  render() {
    /*const activeStyle = {
      backgroundColor: "grey"
    }*/
    console.log('Render Menu')
    const activeItem = this.state.activeItem
    console.log('activeItem: ' + activeItem)
    return (
      <Segment inverted>
        <MenuItem inverted pointing secondary>
          <MenuItem.Item as={Nav} to='/' name='home' onClick={this.handleItemClick}/>
          <MenuItem.Item as={Nav} to='/users' name='users' onClick={this.handleItemClick}/>
          <MenuItem.Item as={Nav} to='/recommended' name='recommended' onClick={this.handleItemClick}/>
          <MenuItem.Item as={Nav} to='/search' name='search' onClick={this.handleItemClick}/>
        </MenuItem>
      </Segment>
    )
  }
}
/*active={activeItem === 'home'} onClick={this.handleItemClick}*/
const Nav = props => (
  <NavLink
    exact
    {...props}
    activeClassName='active'
  />
)

/*<div>
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
</div>*/

const mapStateToProps = (state) => {
  return {
    activeItem: state.activeItem
  }
}

const mapDispatchToProps = {
  setActiveItem
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu
