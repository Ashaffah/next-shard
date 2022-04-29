import React, { Component, triggerRef } from "react";
import { withRouter } from "next/router";
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
  faCirleNotch,
} from "@fortawesome/free-solid-svg-icons";

class Product extends Component {
  constructor(props) {
    super(props);

    this.textInputMinPrice = React.createRef();
    this.textInputMaxPrice = React.createRef();
  }
  state = {
    product: [],
    totalProduct: 0,
    is_visible: false,
    category: [],
    delivery: [],
    activeOrderBy: "Paling Sesuai",
    chevronCategory: false,
    chevronDelivery: false,
    chevronHarga: false,
    chevronSortBy: false,
    chevronBackToTop: false,
    isLoading: false,
    pagination: 0,
    dataFilter: {
      page: 1,
      category: [],
      delivery: [],
      minPrice: 0,
      maxPrice: 0,
    },
  };

  componentDidMount() {
    this.getCategory();
    this.getDelivery();
    this.getProduct();
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("scroll", this.toggleVisibility);
  }
  componentWillUnmount() {
    // window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event) => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      if (this.state.dataFilter.page < this.state.pagination.length) {
        let dataOrderBy = null;
        if (this.state.activeOrderBy === "Harga Tertinggi") {
          dataOrderBy = "high";
        } else if (this.state.activeOrderBy === "Harga Terendah") {
          dataOrderBy = "low";
        } else if (this.state.activeOrderBy === "Terbaru") {
          dataOrderBy = "new";
        }
        let statusCategory = [];
        this.state.dataFilter.category.map((e) => {
          statusCategory.push(e.id);
        });
        if (statusCategory.length < 1) {
          statusCategory = null;
        }

        let statusDelivery = null;
        if (this.state.dataFilter.delivery.id != undefined) {
          statusDelivery = this.state.dataFilter.delivery.id;
        }
        this.setState({
          dataFilter: {
            ...this.state.dataFilter,
            page: this.state.dataFilter.page + 1,
          },
        });
        this.getProduct(
          statusCategory,
          statusDelivery,
          this.state.dataFilter.page + 1,
          this.state.dataFilter.perPage,
          this.state.dataFilter.minPrice,
          this.state.dataFilter.maxPrice,
          dataOrderBy
        );
      }
    }
  };

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  };

  setOrderBy = (val) => {
    let catchValueDelivery = this.state.dataFilter.delivery.id;
    let data = this.state.dataFilter.category;
    let category = [];
    data.map((e) => {
      category.push(e.id);
    });
    if (category.length < 1) {
      category = null;
    }
    let dataOrderBy = null;
    if (val === "Harga Tertinggi") {
      dataOrderBy = "high";
    } else if (val === "Harga Terendah") {
      dataOrderBy = "low";
    } else if (val === "Terbaru") {
      dataOrderBy = "new";
    }

    this.setState({
      activeOrderBy: val,
      chevronSortBy: !this.state.chevronSortBy,
      product: [],
    });
    this.getProduct(
      category,
      catchValueDelivery,
      this.state.dataFilter.page,
      15,
      this.state.dataFilter.minPrice,
      this.state.dataFilter.maxPrice,
      dataOrderBy
    );
  };

  setFilterCategory = (val) => {
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
    let dataOrderBy = null;
    if (this.state.activeOrderBy === "Harga Tertinggi") {
      dataOrderBy = "high";
    } else if (this.state.activeOrderBy === "Harga Terendah") {
      dataOrderBy = "low";
    } else if (this.state.activeOrderBy === "Terbaru") {
      dataOrderBy = "new";
    }
    this.setState({
      dataFilter: {
        ...this.state.dataFilter,
        category: data,
        page: 1,
      },
      product: [],
    });

    let category = [];
    data.map((e) => {
      category.push(e.id);
    });
    if (category.length < 1) {
      category = null;
    }
    this.getProduct(
      category,
      catchValueDelivery,
      1,
      15,
      this.state.dataFilter.minPrice,
      this.state.dataFilter.maxPrice,
      dataOrderBy
    );
  };

  getDelivery = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/delivery`)
      .then((res) => {
        this.setState({ delivery: res.data.data });
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
      })
      .catch((error) => {
        alert(error);
      });
  };
  //http://localhost:5000/products?page=1&perPage=50&category=[3]&order=high&priceMin=20000&priceMax=55000

  getProduct(
    category = null,
    delivery = null,
    page = 1,
    perPage = 15,
    minPrice = 0,
    maxPrice = 0,
    orderBy = null
  ) {
    const paramPage = page > 0 ? page : "";
    const paramCategory = category !== null ? `&category=[${category}]` : "";
    const paramDelivery = delivery !== null ? `&delivery=${delivery}` : "";
    const paramPriceMin = minPrice !== 0 ? `&priceMin=${minPrice}` : "";
    const paramPriceMax = maxPrice !== 0 ? `&priceMax=${maxPrice}` : "";
    const paramOrderBy = orderBy !== null ? `&order=${orderBy}` : "";
    this.setState({ isLoading: true });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MY_BASE_URL}/products?page=${paramPage}&perPage=${perPage}${paramCategory}${paramDelivery}${paramPriceMin}${paramPriceMax}${paramOrderBy}`
      )
      .then((res) => {
        this.setState({
          product: [...this.state.product, ...res.data.data],
          isLoading: false,
          totalProduct: res.data.total_data,
        });
        const countData = Math.ceil(res.data.total_data / perPage);
        let dataPagination = [];

        for (let i = 0; i < countData; i++) {
          dataPagination.push(i);
        }
        this.setState({ pagination: dataPagination });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    const {
      is_visible,
      isLoading,
      product,
      totalProduct,
      category,
      dataFilter,
      delivery,
      chevronCategory,
      chevronDelivery,
      chevronHarga,
      chevronSortBy,
      chevronBackToTop,
      activeOrderBy,
    } = this.state;
    const { router } = this.props;
    return (
      <>
        <div>
          <Navbar />
          <div className="container mx-auto mt-12 md:mt-20 py-4 md:py-8">
            <div className="mx-28 flex justify-between pl-2">
              <div className="w-2/12">
                <div className="text-black text-2xl text-center font-semibold inline-flex items-end">
                  Filter
                </div>
              </div>
              <div className="w-10/12">
                <div className="flex justify-between pl-6">
                  <div className="text-base text-gray-600 inline-flex items-center font-medium">
                    Total Data : {totalProduct}
                  </div>
                  <div>
                    <div className="mr-2 py-auto inline-flex items-center">
                      Urutkan :
                    </div>
                    <div
                      className="rounded-lg cursor-pointer border w-44 justify-between text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-200 
                    focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
                      onClick={() => {
                        this.setState({
                          chevronSortBy: !chevronSortBy,
                        });
                      }}
                    >
                      {this.state.activeOrderBy}
                      <FontAwesomeIcon
                        icon={chevronSortBy ? faChevronUp : faChevronDown}
                      ></FontAwesomeIcon>
                    </div>
                    {/* ); })} */}
                    {chevronSortBy && (
                      <div className="flex justify-end">
                        <div className="border cursor-pointer z-10 w-44 bg-white rounded-b-lg divide-y divide-gray-100 shadow absolute">
                          <ul className="py-1 text-sm text-gray-600">
                            {[
                              "Terbaru",
                              "Harga Terendah",
                              "Harga Tertinggi",
                              "Paling Sesuai",
                            ].map((val, index) => {
                              return (
                                <li key={index}>
                                  <div
                                    onClick={() => {
                                      this.setOrderBy(val);
                                    }}
                                    className={`${
                                      val === activeOrderBy
                                        ? "border-l-4 border-x-orange-700"
                                        : ""
                                    } block py-2 px-4 hover:bg-gray-100`}
                                  >
                                    {val}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 xl:w-3/12">
                <div className="shadow-md mx-8 my-8 rounded-md">
                  <div className="p-4 pr-3 border-b">
                    <div className="text-black text-xl text-left pb-4 pt-4 mx-12">
                      <div className="flex justify-between">
                        <div>Kategori</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            this.setState({
                              chevronCategory: !chevronCategory,
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={chevronCategory ? faChevronDown : faChevronUp}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </div>
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
                            className="text-black text-left cursor-pointer ml-12 mr-8"
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
                  </div>
                  <div className="p-4 pr-3 border-b">
                    <div className="text-black text-xl text-left pb-4 pt-4 mx-12">
                      <div className="flex justify-between">
                        <div>Pengiriman</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            this.setState({
                              chevronDelivery: !chevronDelivery,
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={chevronDelivery ? faChevronDown : faChevronUp}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </div>
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

                            let dataOrderBy = null;
                            if (
                              this.state.activeOrderBy === "Harga Tertinggi"
                            ) {
                              dataOrderBy = "high";
                            } else if (
                              this.state.activeOrderBy === "Harga Terendah"
                            ) {
                              dataOrderBy = "low";
                            } else if (this.state.activeOrderBy === "Terbaru") {
                              dataOrderBy = "new";
                            }
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
                            this.setState({
                              dataFilter: {
                                ...this.state.dataFilter,
                                delivery: valueDelivery,
                                page: 1,
                              },
                              product: [],
                            });
                            this.getProduct(
                              paramCategory,
                              catchValueDelivery,
                              this.state.dataFilter.page,
                              15,
                              this.state.dataFilter.minPrice,
                              this.state.dataFilter.maxPrice,
                              dataOrderBy
                            );
                          }}
                          className="text-black text-left cursor-pointer ml-12 mr-8"
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
                  </div>
                  <div className="p-4">
                    <div className="text-black text-xl text-left pb-4 pt-4 mx-12">
                      <div className="flex justify-between">
                        <div>Harga</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            this.setState({ chevronHarga: !chevronHarga });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={chevronHarga ? faChevronDown : faChevronUp}
                          />
                        </div>
                      </div>
                      {!chevronHarga && (
                        <>
                          <div className="justify-left m-auto">
                            <div className="flex mt-3">
                              <span className="inline-flex items-center px-3 text-sm text-gray-500 font-bold bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
                                Rp
                              </span>
                              <input
                                type="number"
                                ref={this.textInputMinPrice}
                                className="hidden-arrow rounded-none rounded-r-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                placeholder="Harga Minimum"
                                onBlur={(e) => {
                                  let statusPointerLeft = e.target.value;
                                  if (statusPointerLeft > 0) {
                                    let statusDelivery = null;
                                    if (
                                      this.state.dataFilter.delivery.id !=
                                      undefined
                                    ) {
                                      statusDelivery =
                                        this.state.dataFilter.delivery.id;
                                    }

                                    let statusCategory = [];
                                    this.state.dataFilter.category.map(
                                      (event) => {
                                        statusCategory.push(event.id);
                                      }
                                    );
                                    if (statusCategory.length < 1) {
                                      statusCategory = null;
                                    }

                                    let dataOrderBy = null;
                                    if (
                                      this.state.activeOrderBy ===
                                      "Harga Tertinggi"
                                    ) {
                                      dataOrderBy = "high";
                                    } else if (
                                      this.state.activeOrderBy ===
                                      "Harga Terendah"
                                    ) {
                                      dataOrderBy = "low";
                                    } else if (
                                      this.state.activeOrderBy === "Terbaru"
                                    ) {
                                      dataOrderBy = "new";
                                    }

                                    this.setState({
                                      dataFilter: {
                                        ...this.state.dataFilter,
                                        minPrice: e.target.value,
                                      },
                                      product: [],
                                    });
                                    this.getProduct(
                                      statusCategory,
                                      statusDelivery,
                                      this.state.dataFilter.page,
                                      15,
                                      e.target.value,
                                      this.state.dataFilter.maxPrice,
                                      dataOrderBy
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div className="flex mt-3">
                              <span className="inline-flex items-center px-3 text-sm text-gray-500 font-bold bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
                                Rp
                              </span>
                              <input
                                type="number"
                                ref={this.textInputMaxPrice}
                                className="hidden-arrow rounded-none rounded-r-lg bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                placeholder="Harga Maksimum"
                                onBlur={(e) => {
                                  let statusPointerLeft = e.target.value;
                                  if (statusPointerLeft > 0) {
                                    this.setState({
                                      dataFilter: {
                                        ...this.state.dataFilter,
                                        maxPrice: e.target.value,
                                      },
                                      product: [],
                                    });
                                    let statusDelivery = null;
                                    if (
                                      this.state.dataFilter.delivery.id !=
                                      undefined
                                    ) {
                                      statusDelivery =
                                        this.state.dataFilter.delivery.id;
                                    }
                                    let dataOrderBy = null;
                                    if (
                                      this.state.activeOrderBy ===
                                      "Harga Tertinggi"
                                    ) {
                                      dataOrderBy = "high";
                                    } else if (
                                      this.state.activeOrderBy ===
                                      "Harga Terendah"
                                    ) {
                                      dataOrderBy = "low";
                                    } else if (
                                      this.state.activeOrderBy === "Terbaru"
                                    ) {
                                      dataOrderBy = "new";
                                    }
                                    let statusCategory = [];
                                    this.state.dataFilter.category.map((e) => {
                                      statusCategory.push(e.id);
                                    });
                                    if (statusCategory.length < 1) {
                                      statusCategory = null;
                                    }
                                    this.getProduct(
                                      statusCategory,
                                      statusDelivery,
                                      this.state.dataFilter.page,
                                      15,
                                      this.state.dataFilter.minPrice,
                                      e.target.value,
                                      dataOrderBy
                                    );
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="mt-3 w-full">
                            <div className="w-fit mx-auto">
                              <div className="p-2 px-6 mb-3 border rounded-full text-sm text-gray-500 ">
                                Rp38 rb - Rp99 rb
                              </div>
                            </div>
                            <div className="w-fit mx-auto">
                              <div className="p-2 px-6 mb-3 border rounded-full text-sm text-gray-500">
                                Rp120 rb - Rp250 rb
                              </div>
                            </div>
                            <div className="w-fit mx-auto">
                              <div className="p-2 px-6 mb-3 border rounded-full text-sm text-gray-500">
                                Rp350 rb - Rp400 rb
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 justify-center py-4">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-white text-black font-medium text-bold leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg hover:text-white  active:bg-red-600 active:text-white active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => {
                        this.setState({
                          dataFilter: {
                            page: 1,
                            category: [],
                            delivery: [],
                            minPrice: 0,
                            maxPrice: 0,
                          },
                          product: [],
                          activeOrderBy: "Paling Sesuai",
                        });
                        this.textInputMinPrice.current.value = null;
                        this.textInputMaxPrice.current.value = null;
                        this.getProduct();
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
              </div>

              <div className="my-8 w-full lg:w-9/12 xl:w-9/12">
                <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                  {product.map((product, index) => (
                    <div
                      key={index}
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/5 xl:my-2 xl:px-2 xl:w-1/5"
                    >
                      <div
                        className="rounded-lg shadow-lg bg-white max-w-sm h-full cursor-pointer"
                        onClick={() => {
                          router.push(`/product/${product.code}`);
                        }}
                      >
                        <div>
                          <image
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
                                <div className="text-sm font-bold px-2 mr-2 rounded-lg text-center" style="color: rgb(249, 77, 99); background-color: rgb(255, 219, 226);">
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

                <div className="text-center">
                  {isLoading && (
                    <FontAwesomeIcon
                      className="animate-spin text-3xl"
                      icon={faCircleNotch}
                    />
                  )}
                  {is_visible && (
                    <button
                      className="w-12 h-12 fixed bottom-8 right-8 bg-orange-700 text-white cursor-pointer rounded-full"
                      onClick={() => {
                        this.scrollToTop();
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t">
            <div className="container mx-auto px-2 py-3 md:py-8">
              <div className="mx-2 md:mx-28 flex flex-wrap overflow-hidden">
                <div className="w-6/12 overflow-hidden lg:w-2/12">
                  <div>
                    <div className="font-bold px-1 md:px-4 text-gray-700">
                      Tentang Kami
                    </div>
                    <ul className="py-1 text-sm text-gray-600">
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Hak Kekayaan Intelektual
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Karir
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Blog
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Bridestory
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Parents
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Mitra Blog
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Affiliate Program
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          B2B Digital
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-6/12 overflow-hidden lg:w-2/12">
                  <div>
                    <div className="font-bold px-1 md:px-4 text-gray-700">
                      Beli
                    </div>
                    <ul className="py-1 text-sm text-gray-600">
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Tagihan &amp; Top Up
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Tukar Tambah Handphone
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          COD
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold px-1 md:px-4 text-gray-700">
                      Jual
                    </div>
                    <ul className="py-1 text-sm text-gray-600">
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Pusat Edukasi Seller
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Mitra Toppers
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Daftar Official Store
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full overflow-hidden lg:w-3/12">
                  <div>
                    <div className="font-bold px-1 md:px-4 text-gray-700 ">
                      Bantuan dan Panduan
                    </div>
                    <ul className="py-1 text-sm text-gray-600">
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Care
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Syarat dan Ketentuan
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Kebijakan Privasi
                        </div>
                      </li>
                      <li>
                        <div className="block py-2 px-1 md:px-4 hover:text-orange-700 hover:font-medium">
                          Mitra
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold px-1 md:px-4 text-gray-700 text-center md:text-left">
                      Ikuti Kami
                    </div>
                    <div className="flex justify-center md:justify-start">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="instagram-square"
                        className="svg-inline--fa fa-instagram-square m-4 text-xl text-gray-600 hover:text-orange-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M224 202.7A53.34 53.34 0 1 0 277.4 256 53.38 53.38 0 0 0 224 202.7zm124.7-41a54 54 0 0 0 -30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31 6.43a54 54 0 0 0 -30.41 30.41c-8.28 21-6.43 71.05-6.43 94.33S91 329.3 99.32 350.3a54 54 0 0 0 30.41 30.41c21 8.29 71 6.43 94.31 6.43s73.24 1.93 94.3-6.43a54 54 0 0 0 30.41-30.41c8.35-21 6.43-71.05 6.43-94.33S357.1 182.7 348.8 161.7zM224 338a82 82 0 1 1 82-82A81.9 81.9 0 0 1 224 338zm85.38-148.3a19.14 19.14 0 1 1 19.13-19.14A19.1 19.1 0 0 1 309.4 189.7zM400 32H48A48 48 0 0 0 0 80V432a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V80A48 48 0 0 0 400 32zM382.9 322c-1.29 25.63-7.14 48.34-25.85 67s-41.4 24.63-67 25.85c-26.41 1.49-105.6 1.49-132 0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.6 0-132 1.29-25.63 7.07-48.34 25.85-67s41.47-24.56 67-25.78c26.41-1.49 105.6-1.49 132 0 25.63 1.29 48.33 7.15 67 25.85s24.63 41.42 25.85 67.05C384.4 216.4 384.4 295.6 382.9 322z"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        className="svg-inline--fa fa-twitter m-4 text-xl text-gray-600 hover:text-orange-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook"
                        className="svg-inline--fa fa-facebook m-4 text-xl text-gray-600 hover:text-orange-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="pinterest"
                        className="svg-inline--fa fa-pinterest m-4 text-xl text-gray-600 hover:text-orange-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-hidden lg:w-5/12 flex justify-end">
                  <div className="hidden md:block w-12/12">
                    <div className="ant-image">
                      <image
                        alt="ilustration-footer"
                        className="ant-image-img"
                        src="https://imgur.com/UcNJhtw.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Product);
