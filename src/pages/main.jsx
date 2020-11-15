import React from "react";
import PostCard from "../assets/postcard";
import axios from "axios";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post")
    this.setState({ posts: doc.data });
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts.length === 0 ?
          <h4>No posts! </h4>
          : posts.map((post) => {
            return <PostCard post={post} />
          })}
      </div>
    )
  }
}


export default Main;
