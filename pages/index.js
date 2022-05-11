import { Component } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-14 md:mt-20 py-4 md:py-8">
          <div className="md:mx-28">
            <div className="flex flex-wrap overflow-hidden">
              <div className="border w-full overflow-hidden">SECTION 1</div>

              <div className="border w-full overflow-hidden">SECTION 2</div>

              <div className="border w-full overflow-hidden">SECTION 3</div>

              <div className="border w-full overflow-hidden">SECTION 4</div>

              <div className="border w-full overflow-hidden">SECTION 5</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
