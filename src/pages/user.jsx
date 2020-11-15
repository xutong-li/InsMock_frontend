import React from "react";
import PostForm from "../components/post/form";
import axios from "axios";
import { connect } from "react-redux";
import PostCard from "../assets/postcard";
import { Container } from "@material-ui/core";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/user/post");
    const postId = doc.data;
    const promises = await postId.map(async (id) => {
      const doc = await axios.get("/api/post/" + id);
      return doc.data;
    });
    const posts = await Promise.all(promises);
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        <Container style={{ backgroundColor: "#DAF7A6" }}>
          <h2>Welcome to your profile, {currentUser ? currentUser.username : "You need to log in!"}!</h2>
          {currentUser ? <PostForm /> : null}

        </Container>

        {
          posts.length === 0 ?
            <h4>Loading ... </h4>
            :
            posts.map((post) => {
              return <PostCard post={post} />
            })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(User);
