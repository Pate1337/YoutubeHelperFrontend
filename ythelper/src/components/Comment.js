import React from 'react'
import { connect } from 'react-redux'
import { removeOneComment } from '../reducers/commentReducer'

class Comment extends React.Component {
  constructor() {
    super()
  }


  render() {
    if (this.props.receiver != this.props.loggedUser.id) {
      return (
        <div>
          <p>{this.props.received} by: {this.props.sender.id.name} at:
          {this.props.date.substring(0, 10)}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>{this.props.received} by: {this.props.sender.id.name} at:
        {this.props.date.substring(0, 10)}<button onClick={this.removeOneComment}>Delete</button></p>
        </div>
      )
    }
  }

  removeOneComment = async (event) => {
    event.preventDefault()
    await this.props.removeOneComment(this.props.cId)
  }

}



const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
    //rComments: state.userComments hae käyttäjän vastaanotetut kommentit
  }
}

const mapDispatchToProps = {
  removeOneComment
}

const ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Comment)

export default ConnectedComment
