import React from "react";
import { Button, Container, TextField, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: null,
      desc: null,
      trigger: false
    }
  }

  handleImageUpload = async () => {
    // apply a slot for the image, and return the apiURL and image URL
    const uploadConfig = await axios.get("/api/image/upload");
    // upload image by apiURL
    const { file } = this.state;
    await axios
      .put(uploadConfig.data.apiUrl, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    // create a post with imageURL
    const { title, desc } = this.state;
    const photo = uploadConfig.data.imgUrl;
    const post = await axios.post("/api/post", { title, desc, photo });

    // save postId into user database
    const postId = post.data._id;
    await axios.put("/api/user/post/" + postId);
    window.location = "/user";
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#DAF7A6" }}>
        {
          this.state.trigger ?
            <div>
              <Fab color="secondary" aria-label="add" onClick={() => this.setState({ trigger: false })}>
                <CloseIcon />
              </Fab><br />
              <TextField style={{ width: "50%" }} id="standard-basic" label="Title" onChange={e => this.setState({ title: e.target.value })} />
              <br />
              <TextField style={{ width: "50%" }} multiline rows={4} id="standard-basic" label="Description" onChange={e => this.setState({ desc: e.target.value })} />
              <br /><br />
              <input type="file" accept="image/*"
                onChange={(e) => this.setState({ file: e.target.files[0] },
                  () => console.log(this.state.file))} />
              <Button variant="contained" color="primary" onClick={this.handleImageUpload}>Post</Button>
            </div>
            :
            <Fab color="primary" aria-label="add" onClick={() => this.setState({ trigger: true })}>
              <AddIcon />
            </Fab>
        }

      </Container>
    )
  }
}

export default PostForm;