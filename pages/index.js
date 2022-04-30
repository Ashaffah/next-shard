import { Component } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="text-black">Home</div>
        <Footer />
      </div>
    );
  }
}

export default Home;
