import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuItem, Segment, Icon, Popup } from 'semantic-ui-react'
import { setActiveItem } from '../reducers/menuReducer'
import { connect } from 'react-redux'

class Menu extends React.Component {

  handleItemClick = async (event, { name }) => {
    console.log('name = ' + name)
    if (name === 'home') {
      await this.props.setActiveItem('/')
    } else {
      await this.props.setActiveItem('/' + name)
    }
    let address = '/' + name
    if (name === 'home') {
      address = '/'
    }
    this.props.history.push(address)
  }

  render() {
    console.log('Render Menu')
    const activeItem = this.props.activeItem
    console.log('activeItem: ' + activeItem)
    return (
      <Segment inverted>
        <MenuItem inverted pointing secondary widths={4}>
          <MenuItem.Item
            name='home' active={activeItem === '/'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Home' name='home' size='large' />
            }
          />
          <MenuItem.Item
            name='users' active={activeItem === '/users'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Users' name='users' size='large' />
            }
          />
          <MenuItem.Item
            name='recommended' active={activeItem === '/recommended'}
            onClick={this.handleItemClick}
            content={
              <Icon title='Recommendations' name='book' size='large' />
            }
          />
          <MenuItem.Item
            name='search' active={activeItem === '/search'}
            onClick={this.handleItemClick}
            content={
              <div title='Search from Youtube'><Icon name='youtube' size='large' /><Icon name='search' size='large' /></div>  
            }
          />
        </MenuItem>
      </Segment>
    )
  }
}


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
