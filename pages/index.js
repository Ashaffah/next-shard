import { Component } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";
import { Image } from "antd";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

class Home extends Component {
  state = {
    // product: [],
  };

  // componentDidMount() {
  //   this.getCategory();
  //   this.getDelivery();
  //   this.getProduct();
  // }

  getDelivery = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/delivery?&perPage=20`)
      .then((res) => {
        this.setState({ delivery: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  getCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MY_BASE_URL}/category?&perPage=20`)
      .then((res) => {
        this.setState({ category: res.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  getProduct(
    category = null,
    delivery = null,
    page = 1,
    perPage = 5,
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
    // const { product } = this.state;
    let dummyData = [
      {
        id: 1,
        title: "2022 Outerwear Unisex Erigo Coach Jacket",
        code: "2022-Outerwear-Unisex-Erigo-Coach-Jacket",
        price: 83000,
        selling_price: 45000,
        sales: 55,
        image: "uploads/1647958199896-product(1).jpg",
        category_id: 3,
        delivery_id: 1,
        createdAt: "2022-03-17",
        updatedAt: "2022-03-17",
        category: {
          id: 3,
          name: "T-Shirt",
        },
        delivery: {
          id: 1,
          name: "JNE",
        },
      },
      {
        id: 2,
        title: "Kaos Unisex Erigo T-Shirt",
        code: "Kaos-Unisex-Erigo-T-Shirt",
        price: 56000,
        selling_price: 32000,
        sales: 345,
        image: "uploads/1647958199896-product(2).jpg",
        category_id: 3,
        delivery_id: 3,
        createdAt: "2022-03-22",
        updatedAt: "2022-03-22",
        category: {
          id: 3,
          name: "T-Shirt",
        },
        delivery: {
          id: 3,
          name: "SiCepat",
        },
      },
      {
        id: 3,
        title: "Kaos Unisex Erigo T",
        code: "Kaos-Unisex-Erigo-T",
        price: 56000,
        selling_price: 32000,
        sales: 43,
        image: "uploads/1647958199896-product(3).jpg",
        category_id: 3,
        delivery_id: 3,
        createdAt: "2022-03-22",
        updatedAt: "2022-03-22",
        category: {
          id: 3,
          name: "T-Shirt",
        },
        delivery: {
          id: 3,
          name: "SiCepat",
        },
      },
      {
        id: 4,
        title: "Kaos Erigo Pria Terbaru",
        code: "Kaos-Erigo-Pria-Terbaru",
        price: 76000,
        selling_price: 55000,
        sales: 63,
        image: "uploads/1647958199896-product(4).jpg",
        category_id: 3,
        delivery_id: 5,
        createdAt: "2022-03-22",
        updatedAt: "2022-03-22",
        category: {
          id: 3,
          name: "T-Shirt",
        },
        delivery: {
          id: 5,
          name: "J&T",
        },
      },
      {
        id: 5,
        title: "Outerwear Unisex Erigo Coach",
        code: "Outerwear-Unisex-Erigo-Coach",
        price: 34000,
        selling_price: 0,
        sales: 112,
        image: "uploads/1647958199896-product(5).jpg",
        category_id: 3,
        delivery_id: 1,
        createdAt: "2022-03-22",
        updatedAt: "2022-03-22",
        category: {
          id: 3,
          name: "T-Shirt",
        },
        delivery: {
          id: 1,
          name: "JNE",
        },
      },
    ];

    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-14 md:mt-20 py-4 md:py-8">
          <div className="md:mx-28">
            <div className="border relative">BANNER</div>
            <div
              className="hidden md:block rounded-lg my-5 p-5"
              style={{ boxShadow: "0 1px 6px 0 rgb(49 53 59 / 12%)" }}
            >
              <div className="flex">
                <div className="w-6/12">
                  <div className="mb-4 text-2xl font-bold">
                    Kategori Pilihan
                  </div>
                  <div className="flex">
                    <div className="h-28 w-28 mr-3 border p-4 rounded-lg">
                      kategori 1
                    </div>
                    <div className="h-28 w-28 mr-3 border p-4 rounded-lg">
                      kategori 2
                    </div>
                    <div className="h-28 w-28 mr-3 border p-4 rounded-lg">
                      kategori 3
                    </div>
                    <div className="h-28 w-28 mr-3 border p-4 rounded-lg">
                      kategori 4
                    </div>
                    <div className="h-28 w-28 mr-3 border p-4 rounded-lg">
                      kategori 5
                    </div>
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="mb-4 text-2xl font-bold">
                    Pengiriman Pilihan
                  </div>
                  <div className="border rounded-lg w-full h-28"></div>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
                <div className="border mr-3 py-2 rounded-lg px-3">Kategori</div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex border-t pt-5 justify-between md:justify-start">
                <div className="font-bold text-lg md:text-2xl">
                  Spesial Offers
                </div>
                <div className="mx-3 inline-flex items-end">Ends in :</div>
                <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mr-2">
                  03
                </div>
                :
                <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mx-2">
                  34
                </div>
                :
                <div className="px-2 py-1 text-white font-bold rounded bg-red-600 mx-2">
                  54
                </div>
                <div className="text-orange-600 font-bold inline-flex items-end">
                  Lihat Semua
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <div className="w-3/12 h-auto bg-green-400 rounded-lg text-green-400">
                  BANNER
                </div>
                <div className="w-9/12 flex p-3">
                  {dummyData.map((dummy, index) => (
                    <div
                      key={index}
                      className="justify-center w-full lg:my-2 lg:px-2 lg:w-1/5 xl:my-2 xl:px-2 xl:w-1/5"
                    >
                      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full cursor-pointer">
                        <div>
                          <Image
                            className="rounded-t-lg w-full"
                            src={
                              `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                              dummy.image
                            }
                            preview={false}
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="text-gray-900 text-sm font-medium mb-2">
                            {dummy.title}
                          </h5>
                          {dummy.selling_price > 0 ? (
                            <>
                              <div className="flex mb-1">
                                <div
                                  className="text-sm font-bold px-2 mr-2 rounded-lg text-center"
                                  style={{
                                    color: "#F94D63",
                                    backgroundColor: "#FFDBE2",
                                  }}
                                >
                                  {(
                                    (dummy.selling_price / dummy.price) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                                <div className="text-gray-500 text-sm font-medium line-through">
                                  <CurrencyFormat
                                    value={dummy.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp. "}
                                  />
                                </div>
                              </div>
                              <div className="text-orange-600 font-bold text-base">
                                <CurrencyFormat
                                  value={dummy.selling_price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp. "}
                                />
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div
                                  className="bg-red-600 h-2.5 rounded-full"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                            </>
                          ) : (
                            <>
                              <dif>
                                <div className="text-orange-600 font-bold text-base">
                                  <CurrencyFormat
                                    value={dummy.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp. "}
                                  />
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                  <div
                                    className="bg-red-600 h-2.5 rounded-full"
                                    style={{ width: "45%" }}
                                  ></div>
                                </div>
                              </dif>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 mx-3 md:mx-0">
              <div className="flex border-t pt-5 justify-between md:justify-start">
                <div className="font-bold text-lg md:text-2xl mr-3">
                  Bedasarkan pecarianmu
                </div>
                <div className="text-orange-600 font-bold inline-flex items-end">
                  Lihat Semua
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                {dummyData.map((dummy, index) => (
                  <div
                    className="justify-center w-1/2 p-1.5 md:py-0 lg:my-2 lg:px-2 lg:w-1/5 xl:my-2 xl:px-2 xl:w-1/5"
                    key={index}
                  >
                    <div className="rounded-lg shadow-lg bg-white max-w-sm h-full cursor-pointer">
                      <div>
                        <Image
                          className="rounded-t-lg w-full"
                          src={
                            `${process.env.NEXT_PUBLIC_MY_BASE_URL}/` +
                            dummy.image
                          }
                          preview={false}
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="text-gray-900 text-sm font-medium mb-2">
                          {dummy.title}
                        </h5>
                        {dummy.selling_price > 0 ? (
                          <>
                            <div className="flex mb-1">
                              <div
                                className="text-sm font-bold px-2 mr-2 rounded-lg text-center"
                                style={{
                                  color: "#F94D63",
                                  backgroundColor: "#FFDBE2",
                                }}
                              >
                                {(
                                  (dummy.selling_price / dummy.price) *
                                  100
                                ).toFixed(0)}
                                %
                              </div>
                              <div className="text-gray-500 text-sm font-medium line-through">
                                <CurrencyFormat
                                  value={dummy.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp. "}
                                />
                              </div>
                            </div>
                            <div className="text-orange-600 font-bold text-base">
                              <CurrencyFormat
                                value={dummy.selling_price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                            <div className="flex">
                              <div className="mr-1">
                                <FontAwesomeIcon
                                  className="text-yellow-400"
                                  icon={faStar}
                                />
                              </div>
                              <div className="text-sm inline-flex items-center">
                                5.0 | Terjual 40+
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-orange-600 font-bold text-base">
                              <CurrencyFormat
                                value={dummy.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                            <div className="flex">
                              <div className="mr-1">
                                <FontAwesomeIcon
                                  className="text-yellow-400"
                                  icon={faStar}
                                />
                              </div>
                              <div className="text-sm inline-flex items-center">
                                5.0 | Terjual 40+
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 mx-3 md:mx-0">
              <div className="hidden md:block">
                <div className="flex flex-wrap border-t pt-5">
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-red-500 text-white font-bold">
                    For Danang, Rafi, Tiar
                  </div>
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-green-500 text-white font-bold">
                    Handphone & Tablet
                  </div>
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-blue-500 text-white font-bold">
                    Festival Distro Lokal
                  </div>
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-yellow-500 text-white font-bold">
                    Travel & Entertainment
                  </div>
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-pink-500 text-white font-bold">
                    Perawatan Hewan
                  </div>
                  <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-teal-500 text-white font-bold">
                    Special Discount
                  </div>
                </div>
              </div>
              <div className="block md:hidden">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={"auto"}
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-red-500 text-white font-bold">
                      For Danang, Rafi, Tiar
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-green-500 text-white font-bold">
                      Handphone & Tablet
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-blue-500 text-white font-bold">
                      Festival Distro Lokal
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-yellow-500 text-white font-bold">
                      Travel & Entertainment
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-pink-500 text-white font-bold">
                      Perawatan Hewan
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="width-auto">
                    <div className="border mr-3 py-2 rounded-lg pl-3 pr-10 h-16 bg-teal-500 text-white font-bold">
                      Special Discount
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className=""></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
