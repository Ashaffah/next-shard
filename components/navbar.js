import { Component } from "react";
import Link from "next/link";
import { Image } from "antd";
import { withRouter } from "next/router";
class Navbar extends Component {
  state = {
    active: "Dashboard",
    menu: [
      {
        name: "Dashboard",
        route: "/",
      },
      {
        name: "Product",
        route: "/product",
      },
      {
        name: "Category",
        route: "/category",
      },
    ],
  };
  componentDidMount() {
    this.pageURL();
  }
  pageURL() {
    if (window.location.pathname.includes("/product")) {
      this.setState({ active: "Product" });
    } else if (window.location.pathname.includes("/category")) {
      this.setState({ active: "Category" });
    }
    // console.log("BBBBBBBBB", window.location.pathname);
  }

  render() {
    const { router } = this.props;
    const { active, menu } = this.state;
    return (
      <div className="relative ">
        <nav className="fixed top-0 left-0 right-0 shadow bg-white z-10">
          <div className="container mx-auto px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <nav className="text-orange-700 text-2xl font-bold">
                  <Link href="/">RF|DA</Link>
                </nav>
                <div className="hidden sm:block sm:ml-6 w-full">
                  <div className="flex space-x-4">
                    {menu.map((menu, idx) => (
                      <div
                        key={idx}
                        className={
                          active == menu.name
                            ? "border-b-4 border-orange-700 text-orange-700 px-3 py-2 text-sm font-bold cursor-pointer"
                            : "text-gray-800 hover:text-gray-500 hover:border-gray-500 hover:border-b-4 px-3 py-2 text-sm font-medium cursor-pointer"
                        }
                        onClick={() => {
                          router.push(menu.route);
                          this.setState({ active: menu.name });
                        }}
                      >
                        {menu.name}
                      </div>
                    ))}
                    <div className="mx-3 w-full my-auto">
                      <div className="input-group relative flex mx-4">
                        <input
                          type="text"
                          className="form-control relative flex-auto min-w-0 block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-200 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-400 focus:outline-none"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <button
                          className="btn inline-block px-2 py-2 bg-gray-200 text-gray-400 font-medium text-xs leading-tight uppercase rounded-r-lg hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                          type="button"
                          id="button-addon2"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            className="w-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">shopping card</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="cart-shopping"
                    className="svg-inline--fa fa-cart-shopping "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">notification</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bell"
                    className="svg-inline--fa fa-bell "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Message</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="envelope"
                    className="svg-inline--fa fa-envelope "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                    ></path>
                  </svg>
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <Image
                        src="https://avatars.githubusercontent.com/u/35194643?v=4"
                        className="h-8 w-8 rounded-full"
                        preview={false}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu"></div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
