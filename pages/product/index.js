import { Component } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
class Product extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct(page = 1, perPage = 12) {
    const paramPage = page !== 1 ? page : "";

    // console.log("paramPage", paramPage)

    axios
      .get(
        `https://backend-express-rfda.herokuapp.com/products?page=${paramPage}&perPage=${perPage}`
      )
      .then((res) => {
        this.setState({ product: res.data.data });

        // const countData = Math.ceil(res.data.total_data / perPage);
        // let dataPagination = [];

        // for (let i = 0; i < countData; i++) {
        //   dataPagination.push(i);
        // }
        // setPagination(dataPagination);
        // console.log("DATA", res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    const { product } = this.state;
    console.log("AAAAA", product);
    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-20 py-4 md:py-8">
          <div className="flex flex-wrap">
            <div className="border h-20 w-full lg:w-3/12 xl:w-3/12">
              <div className="border m-2">filter</div>
            </div>

            <div className="border h-20 w-full lg:w-9/12 xl:w-9/12">
              <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                {product.length > 0 &&
                  product.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-center w-full lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4"
                    >
                      <div className="rounded-lg shadow-lg bg-white max-w-sm">
                        <a href="#!">
                          <img
                            className="rounded-t-lg"
                            src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                            alt=""
                          />
                        </a>
                        <div className="p-6">
                          <h5 className="text-gray-900 text-xl font-medium mb-2">
                            {product.title}
                          </h5>
                          <p className="text-gray-700 text-base mb-4">
                            {product.price}
                          </p>
                          <p className="text-orange-600 font-bold text-base mb-4">
                            {product.selling_price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div className="w-full lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4">
                  <div className="border">Column</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Product;
