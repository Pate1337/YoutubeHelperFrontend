import React from 'react'
import { connect } from 'react-redux'
import { addReceivedComment } from '../reducers/commentReducer'
import { addSentComment } from '../reducers/commentReducer'
import { allUsersComments } from '../reducers/commentReducer'
import Comment from './Comment'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: true,
      comment: '',
      resComments: null
    }
  }

  toggleVisibility = async () => {
    //await allUsersComments(this.props.cuser)
    this.setState({
      showComments: !this.state.showComments
    })
  }

  handleCommentField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleComment = async (event) => {
    event.preventDefault()
    const sComment = {
      content: this.state.comment,
      receiver: this.props.cuser,
      sender: this.props.loggedUser.id
    }
    const response = await this.props.addSentComment(sComment)
    this.getReceivedComments()
    this.setState({
      comment: '',
      //resComments: this.props.userComments.rComments
    })

  }

  getReceivedComments = async () => {
    const comments = await this.props.allUsersComments(this.props.cuser)
    this.setState({
      resComments: comments
    })
  }



  render() {
    if(this.state.showComments) {
      return (
        <div>
          <h3 onClick={this.toggleVisibility}>Comments (click to hide)</h3>
          <p>Testing</p>
          {this.props.userComments.rComments.map(comment =>
            <Comment key={comment.id} cId={comment.id} received={comment.content} sender={comment.sender}
            date={comment.date} receiver={comment.receiver}/>
          )}

          <form onSubmit={this.handleComment}>
            Type a comment to send:
              <input
              type='text'
              name='comment'
              value={this.state.comment}
              onChange={this.handleCommentField}
              />
            <button type='submit'>
              Send
            </button>
          </form>
        </div>
      )
    } else {
      return (
        <h3 onClick={this.toggleVisibility}>Comments (click to show)</h3>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,

    //receivedComments: allComments(this.props.cuser)
    userComments: state.userComments
  }
}

const mapDispatchToProps = {
  addReceivedComment,
  addSentComment,
  allUsersComments
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)


export default ConnectedComments
