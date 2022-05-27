import React, { Component, triggerRef } from "react";
import { withRouter } from "next/router";
import Navbar from "../../components/navbar";
import { Image } from "antd";
import Footer from "../../components/footer";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
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
  faFilter,
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
      activeOrderBy,
    } = this.state;
    const { router } = this.props;
    return (
      <>
        <div>
          <Navbar />
          <div className="container mx-auto mt-12 md:mt-20 py-4 md:py-8">
            <div className="hidden md:block">
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
            </div>
            <div className="md:mx-28 flex flex-wrap">
              <div className="sm:hidden w-full">
                <div className="flex items-center text-gray-600 overflow-hidden">
                  <div className="w-fit">
                    <div className="w-fit flex items-center border ml-3 mr-2 py-1 rounded-full px-4">
                      <FontAwesomeIcon className="mr-2" icon={faFilter} />
                      Filter
                    </div>
                  </div>
                  <div className="w-9/12">
                    <Swiper
                      // install Swiper modules
                      spaceBetween={6}
                      slidesPerView={3}
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                    >
                      {category.map((val, index) => {
                        const status =
                          dataFilter.category
                            .map((event) => {
                              return event.name;
                            })
                            .indexOf(val.name) > -1;
                        return (
                          <SwiperSlide
                            className={
                              status
                                ? "border border-orange-600 rounded-full mr-2 px-4 py-1 text-orange-600"
                                : "border w-fit mr-2 py-1 rounded-full px-4"
                            }
                            key={index}
                            onClick={() => {
                              this.setFilterCategory(val);
                            }}
                          >
                            {val.name}
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="hidden md:block w-full lg:w-3/12 xl:w-3/12">
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

              <div className="my-2 w-full lg:w-9/12 xl:w-9/12">
                <div className="flex flex-wrap lg:-mx-2 xl:-mx-2">
                  {product.map((product, index) => (
                    <div
                      key={index}
                      className="justify-center p-1.5 md:py-0 lg:my-2 lg:px-2 xl:my-2 xl:px-2 w-1/2 md:w-1/5"
                    >
                      <div
                        className="rounded-lg shadow-lg bg-white max-w-sm h-full cursor-pointer"
                        onClick={() => {
                          router.push(`/product/${product.code}`);
                        }}
                      >
                        <div>
                          <Image
                            className="rounded-t-lg w-full"
                            src={
                              `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                              product.image
                            }
                            preview={false}
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
                                <div
                                  className="text-sm font-bold px-2 mr-2 rounded-lg text-center"
                                  style={{
                                    color: "rgb(249, 77, 99)",
                                    backgroundColor: "rgb(255, 219, 226)",
                                  }}
                                >
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
          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(Product);
