import React from "react";
import { connect } from "react-redux";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateNumber: 0
    }
  }

  renderCurrentUser = () => {
    const { currentUser } = this.props;
    switch (currentUser) {
      case null:
        return <h4>Loading ...</h4>;
      case false:
        return <a class="nav-link" href="/signin">Sign In</a>;
      default:
        return <div className="row">
          <h4>{currentUser.username}</h4>
          <a class="nav-link" href="/api/auth/signout">Sign Out</a>
        </div>;
    }
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Instagram</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/user">Profile</a>
            </li>
          </ul>
          <span class="navbar-text">
            {this.renderCurrentUser()}
          </span>
        </div>
      </nav>
    )
  }
}

// extract data from redux
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(NavBar);
