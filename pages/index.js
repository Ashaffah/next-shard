import { Component } from "react";

import Navbar from "../components/navbar";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="text-black">Home</div>
      </div>
    );
  }
}

export default Home;
