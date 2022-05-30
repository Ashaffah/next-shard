import { Image } from "antd";
import { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faTwitter,
  faFacebook,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

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
                  <FontAwesomeIcon
                    className="m-4 text-xl text-gray-600 hover:text-orange-600"
                    icon={faInstagramSquare}
                  />
                  <FontAwesomeIcon
                    className="m-4 text-xl text-gray-600 hover:text-orange-600"
                    icon={faTwitter}
                  />
                  <FontAwesomeIcon
                    className="m-4 text-xl text-gray-600 hover:text-orange-600"
                    icon={faFacebook}
                  />
                  <FontAwesomeIcon
                    className="m-4 text-xl text-gray-600 hover:text-orange-600"
                    icon={faPinterest}
                  />
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
