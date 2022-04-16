import { Component } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

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
        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/products?page=${paramPage}&perPage=${perPage}`
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
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4"
                    >
                      <div className="rounded-lg shadow-lg bg-white max-w-sm">
                        <div>
                          <img
                            className="rounded-t-lg w-full"
                            src={
                              `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                              product.image
                            }
                            alt={product.name}
                          />
                        </div>
                        <div className="p-6">
                          <h5 className="text-gray-900 text-xl font-medium mb-2">
                            {product.title}
                          </h5>
                          <div className="flex mb-5">
                            <div className="bg-emerald-500 text-white px-2 mr-2 rounded-lg text-center">
                              {(
                                (product.selling_price / product.price) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                            <div className="text-gray-700 text-base">
                              <CurrencyFormat
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                          </div>
                          <div className="text-orange-600 font-bold text-base ">
                            <CurrencyFormat
                              value={product.selling_price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                            />
                          </div>
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
