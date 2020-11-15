import React from "react";
import { Container, Button } from "@material-ui/core";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Container style={{ backgroundColor: 'rgba(250,250,250,1)', flex: 1 }}>
        <Container>
          <div className="row" style={{ marginLeft: "10%" }}>
            <div className="col">
              <img src={process.env.PUBLIC_URL + "/pictures/ins_login.png"} />
            </div>
            <div className="col" style={{ height: 50, marginLeft: "10%", marginTop: "20%" }}>
              <h1>Instagram</h1>
              <Button variant="contained" color="primary" href="/api/google">
                Sign In With Google Account!
              </Button>
            </div>
          </div>
        </Container>
      </Container>
    )
  }
}

export default SignIn;
