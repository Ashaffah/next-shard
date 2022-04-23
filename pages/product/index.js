import { Component, triggerRef } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faStar,
  faEllipsis,
  faCircleNotch,
  faPlus,
  faMinus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
class Product extends Component {
  state = {
    product: [],
    category: [],
    delivery: [],
    chevronCategory: false,
    chevronDelivery: false,
    dataFilter: {
      page: 1,
      category: [],
      delivery: [],
    },
  };

  componentDidMount() {
    this.getProduct();
    this.getCategory();
    this.getDelivery();
  }

  setFilterCategory = (val) => {
    // console.log("value", val);
    // console.log("datafiterkategori", this.state.dataFilter.category);
    // const page = [];
    let catchValueDelivery = this.state.dataFilter.delivery.id;
    let data = this.state.dataFilter.category;
    let indexFilter = data
      .map((event) => {
        return event.name;
      })
      .indexOf(val.name);

    if (indexFilter !== -1) {
      data.splice(indexFilter, 1);
    } else {
      data.push(val);
    }

    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        category: data,
      },
    });

    let category = [];
    data.map((e) => {
      category.push(e.id);
    });
    if (category.length < 1) {
      category = null;
    }
    console.log("category", category);
    this.getProduct(category, catchValueDelivery);
  };

  getDelivery = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/delivery`)
      .then((res) => {
        this.setState({ delivery: res.data.data });
        // console.log("DELIVERY", res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  getCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/category`)
      .then((res) => {
        this.setState({ category: res.data.data });
        // console.log("DATA", res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  getProduct(category = null, delivery = null, page = 1, perPage = 12) {
    const paramPage = page > 0 ? page : "";
    const paramCategory = category !== null ? `&category=[${category}]` : "";
    const paramDelivery = delivery !== null ? `&delivery=${delivery}` : "";
    // console.log("paramPage", paramPage)
    // console.log("aaaa", category);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/products?page=${paramPage}&perPage=${perPage}${paramCategory}${paramDelivery}`
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
    const {
      product,
      category,
      dataFilter,
      delivery,
      chevronCategory,
      chevronDelivery,
    } = this.state;

    console.log("####", chevronDelivery);

    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-20 py-4 md:py-8">
          <div className="flex flex-wrap">
            <div className=" w-full lg:w-3/12 xl:w-3/12">
              <div className="shadow-xl mx-8 my-8">
                <div className="text-black text-2xl text-center font-bold">
                  Filter
                </div>
                <div className="text-black text-xl text-left pb-4 pt-4 mx-16">
                  <div className="flex justify-between">
                    <div>Kategori</div>
                    <div
                      onClick={() => {
                        this.setState({ chevronCategory: !chevronCategory });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={chevronCategory ? faChevronDown : faChevronUp}
                      ></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
                {/* {console.log("~~~~~~~~~~~~~~~~", dataFilter.category.name)} */}
                {!chevronCategory &&
                  category.map((val, index) => {
                    const status =
                      dataFilter.category
                        .map((event) => {
                          return event.name;
                        })
                        .indexOf(val.name) > -1;
                    return (
                      <div
                        onClick={() => {
                          this.setFilterCategory(val);
                        }}
                        className="text-black text-left cursor-pointer mx-16"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="mr-2 accent-orange-600"
                          checked={status}
                          onChange={() => {}}
                        />
                        <span
                          className={
                            status ? "text-orange-600 font-bold" : null
                          }
                        >
                          {val.name}
                        </span>
                      </div>
                    );
                  })}
                <div className="text-black text-xl text-left pb-4 pt-4 mx-16">
                  <div className="flex justify-between">
                    <div>Pengiriman</div>
                    <div
                      onClick={() => {
                        this.setState({ chevronDelivery: !chevronDelivery });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={chevronDelivery ? faChevronDown : faChevronUp}
                      ></FontAwesomeIcon>
                    </div>
                  </div>
                </div>
                {/* {console.log("@@@@@@@@@@@@@@@@@", dataFilter.delivery)} */}
                {!chevronDelivery &&
                  delivery.map((valueDelivery, index) => (
                    <div
                      onClick={() => {
                        let catchValueDelivery = {};
                        if (this.state.dataFilter.delivery != {}) {
                          if (
                            this.state.dataFilter.delivery.name !=
                            valueDelivery.name
                          ) {
                            catchValueDelivery = valueDelivery;
                          }
                        }
                        this.setState({
                          dataFilter: {
                            ...this.state.dataFilter,
                            delivery: catchValueDelivery,
                            page: 1,
                          },
                        });
                        let paramCategory = [];
                        this.state.dataFilter.category.map((e) => {
                          paramCategory.push(e.id);
                        });
                        if (paramCategory.length < 1) {
                          paramCategory = null;
                        }

                        if (catchValueDelivery.id == undefined) {
                          catchValueDelivery = null;
                        } else {
                          catchValueDelivery = catchValueDelivery.id;
                        }
                        console.log("catchValueDelivery", catchValueDelivery);
                        console.log("paramCategory", paramCategory);
                        this.getProduct(
                          paramCategory,
                          catchValueDelivery,
                          1,
                          12
                        );
                      }}
                      className="text-black text-left cursor-pointer mx-16"
                      key={index}
                    >
                      <span
                        className={
                          dataFilter.delivery.name === valueDelivery.name
                            ? "text-orange-600 font-bold"
                            : null
                        }
                      >
                        <input
                          type="checkbox"
                          className="mr-2 accent-orange-600"
                          checked={
                            dataFilter.delivery.name === valueDelivery.name
                              ? true
                              : false
                          }
                          onChange={() => {}}
                        />
                        {valueDelivery.name}
                      </span>
                    </div>
                  ))}
                {/* <input
                  className="input"
                  type="number"
                  placeholder="Harga Minimum"
                ></input>
                <input
                  className="input"
                  type="number"
                  placeholder="Harga Maksimum"
                ></input> */}
                <div className="flex space-x-2 justify-center py-4">
                  <button
                    type="button"
                    class="inline-block px-6 py-2.5 bg-white text-black font-medium text-bold leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg hover:text-white  active:bg-red-600 active:text-white active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                      this.setState({
                        dataFilter: {
                          page: 1,
                          category: [],
                          delivery: [],
                        },
                      });
                      this.getProduct();
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="my-8 h-20 w-full lg:w-9/12 xl:w-9/12">
              <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                {product.map((product, index) => (
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
                          <div>
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
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Product;
