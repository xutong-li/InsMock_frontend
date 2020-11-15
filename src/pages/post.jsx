import React from "react";
import { Container, Button } from "@material-ui/core";
import { connect } from "react-redux";
import keys from "../assets/keys";
import axios from "axios";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.id,
      postInfo: null,
    };
  }

  componentDidMount = async () => {
    const { postId } = this.state;
    const doc = await axios.get("/api/post/" + postId);
    this.setState({ postInfo: doc.data });
  };

  handleDelete = async () => {
    const { postId } = this.state;
    // delete post
    await axios.delete("/api/post/" + postId);
    // delete post id in user database
    await axios.delete("/api/user/post/" + postId);
    window.location = "/user";
  };

  render() {
    const { postInfo, postId } = this.state;
    const { currentUser } = this.props;
    return (
      <div style={{ marginBottom: 50 }}>
        {postInfo ? (
          <div>
            <div className="jumbotron">
              <h3 className="text-monospace">{postInfo.title}</h3>
              <hr />
              <h5 className="text-monospace">
                ---- post by {postInfo.userName}
              </h5>
              {currentUser && postInfo.userId === currentUser._id ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              ) : null}
            </div>
            <Container>
              <div className="row">
                <div className="col-md-8">
                  <img
                    src={keys.AWS_S3 + postInfo.photo}
                    className="img-fluid"
                    alt="Responsive image"
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: 20 }}>
                  <p className="text-monospace">{postInfo.desc}</p>
                </div>
              </div>
            </Container>
          </div>
        ) : "Loading ..."}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(PostPage);
