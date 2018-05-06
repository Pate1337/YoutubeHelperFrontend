import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

class Welcome extends React.Component {

  render() {
    return (
      <Grid>
        <Grid.Column>
          <h3>Welcome to YoutubeHelper!</h3>
          <p>Here you can find and watch videos from Youtube easily. </p>
          <p>We highly recommend that you <Link to='/signup'>create an account
          </Link> for yourself to get the full experience of our app.</p>
          <p>As a signed up user you can add videos to your favourites
          and create playlists. We will also do our best to find the best
          matching videos for your taste and recommend them for you.</p>
          <p><Link to='/signup'>Create an account</Link> now or <Link to='/login'>
          login</Link> and start searching videos!</p>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Welcome
