import { Image } from "antd";
import { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
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
                <div className="font-bold px-1 md:px-4 text-gray-700">Beli</div>
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
                <div className="font-bold px-1 md:px-4 text-gray-700">Jual</div>
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
                <div className="">
                  <Image
                    alt="ilustration-footer"
                    className="ant-image-img"
                    src="https://imgur.com/UcNJhtw.jpg"
                    preview={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
