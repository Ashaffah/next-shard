import { Component } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

class DetailProduct extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div>
          <div className="flex flex-wrap overflow-hidden mt-24">
            <div className="border overflow-hidden w-full md:w-1/3">
              SECTION 1
            </div>

            <div className="border overflow-hidden w-full md:w-1/3">
              SECTION 2
            </div>

            <div className="border overflow-hidden w-full md:w-1/3">
              SECTION 3
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default DetailProduct;
