import React from 'react'
import { connect } from 'react-redux'

class Comment extends React.Component {
  constructor() {
    super()
  }


  render() {
    console.log('Rendering Comment')
    return (
      <div>
        <p>TESTI</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
    //rComments: state.userComments hae käyttäjän vastaanotetut kommentit
  }
}

const ConnectedComment = connect(mapStateToProps)(Comment)

export default ConnectedComment