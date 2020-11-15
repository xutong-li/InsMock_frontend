import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import SignIn from "./pages/signin";
import NavBar from "./components/partials/navbar";
import User from "./pages/user";
import Post from "./pages/post";
import axios from "axios";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/action";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/user/current");
    const currentUser = doc.data;
    this.props.setCurrentUser(currentUser);
  }


  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/user" component={User} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </Router>
    )
  }
}

// store stuff into redux
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
}); // curring

export default connect(null, mapDispatchToProps)(App);
