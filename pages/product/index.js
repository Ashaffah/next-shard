import { Component } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

class Product extends Component {
  state = {
    product: {},
    category: {},
    dataFilter: {
      page: 1,
      category: {},
      delivery: {},
    },
  };

  componentDidMount() {
    this.getProduct();
    this.getCategory();
  }

  getCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/category`)
      .then((res) => {
        this.setState({ category: res.data.data });
        console.log("DATA", res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

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
    const { product, category, dataFilter } = this.state;

    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-20 py-4 md:py-8">
          <div className="flex flex-wrap">
            <div className="border h-20 w-full lg:w-3/12 xl:w-3/12">
              <div className="text-black text-2xl text-center font-bold">
                Filter
              </div>
              <div className="text-black text-xl text-left">Kategory</div>
              {console.log("~~~~~~~~~~~~~~~~", dataFilter.category.name)}
              {category.length > 0 &&
                category.map((val, index) => (
                  <div
                    className="text-black text-left cursor-pointer"
                    key={index}
                  >
                    <span
                      className={
                        dataFilter.category.name === val.name
                          ? "text-black font-bold"
                          : null
                      }
                      onClick={() => {
                        this.getProduct(val.id, dataFilter.delivery.id);
                        // setDataFilter((prevState) => ({
                        //   ...prevState,
                        //   category: val,
                        // }));
                        this.setState({
                          dataFilter: {
                            ...this.state.dataFilter,
                            category: val,
                          },
                        });
                      }}
                    >
                      <input type="checkbox" className="default:ring-2" />
                      {val.name}
                    </span>
                  </div>
                ))}
            </div>

            <div className="border h-20 w-full lg:w-9/12 xl:w-9/12">
              <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                {product.length > 0 &&
                  product.map((product, index) => (
                    <div
                      key={index}
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4"
                    >
                      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full">
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

                          {product.selling_price > 0 ? (
                            <>
                              <div className="flex mb-5">
                                <div className="bg-emerald-500 text-white px-2 mr-2 rounded-lg text-center">
                                  {(
                                    (product.selling_price / product.price) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                                <div className="text-gray-700 text-base line-through">
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
                            </>
                          ) : (
                            <>
                              <div className="flex">
                                <div className="text-orange-600 font-bold text-base ">
                                  <CurrencyFormat
                                    value={product.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp. "}
                                  />
                                </div>
                              </div>
                            </>
                          )}
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
