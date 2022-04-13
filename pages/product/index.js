import { Component } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
class Product extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct(page = 1, perPage = 10) {
    const paramPage = page !== 1 ? page : "";

    // console.log("paramPage", paramPage)

    axios
      .get(
        `https://backend-express-rfda.herokuapp.com/products?page=${paramPage}&perPage=${perPage}`
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
    console.log("AAAAA", product);
    return (
      <>
        <Navbar />
        <div>
          {product.length > 0 &&
            product.map((product, index) => (
              <div key={index}>{product.title}</div>
            ))}
        </div>
      </>
    );
  }
}

export default Product;
