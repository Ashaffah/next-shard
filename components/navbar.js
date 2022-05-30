import { Component } from "react";
import Link from "next/link";
import { Image } from "antd";
import { withRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faCartShopping,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
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

                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden lg:block">
                  {
                    //Web Desktop
                  }
                  <nav className="text-orange-700 text-2xl font-bold">
                    <Link href="/">RF|DA</Link>
                  </nav>
                </div>
                <div className="block lg:hidden">
                  {
                    //Web Phone
                  }
                  <nav className="text-orange-700 text-2xl font-bold">
                    RF|DA
                  </nav>
                </div>
                <div className="hidden lg:block sm:ml-6 w-full">
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
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">shopping card</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                  <button
                    type="button"
                    className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">notification</span>
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                  <button
                    type="button"
                    className="p-1 mx-2 rounded-full text-gray-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Message</span>
                    <FontAwesomeIcon icon={faEnvelope} />
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
              <div>
                {
                  //
                }
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
