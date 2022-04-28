import { Component } from "react";
import Navbar from "../../components/navbar";

class DetailProduct extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div>
          <div class="flex flex-wrap overflow-hidden mt-24">
            <div class="w-full overflow-hidden lg:w-1/3">SECTION 1</div>

            <div class="w-full overflow-hidden lg:w-1/3">SECTION 2</div>

            <div class="w-full overflow-hidden lg:w-1/3">SECTION 3</div>
          </div>
        </div>
      </>
    );
  }
}

export default DetailProduct;
