import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/component/product-item";

function Home() {
  const [newProduct, setNewProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    document.title = "Home";
    //get featured product
    getProducts({
      params: {
        limit: 6,
        is_featured: true,
      },
    })
      .then(({ data }) => setFeaturedProduct(data.data))
      .catch((error) => console.log(error));
    //get new products
    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setNewProduct(data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featuredProduct.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/*        End Feature Product        */}
      {/*        Latest Product        */}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {newProduct.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
