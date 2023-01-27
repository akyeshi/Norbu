import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../store/products";
import "./index.css";

const ProductsBrowser = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  console.log("current user: -----------\n", currUser);

  const productsObj = useSelector((state) => state.products.allProducts);
  const productArr = Object.values(productsObj);

  /* simplist way to shuffle an array in JavaScript
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  */

  const randomProducts = productArr.sort(() => 0.5 - Math.random());
  const valentineProducts = productArr.filter(
    (product) => product.category === "Valentine"
  );

  const displayProducts = randomProducts.slice(0, 8);
  // const sponsorProducts = randomProducts.slice(8, 13);
  // const EditorPickProducts = randomProducts.slice(13, 18);
  useEffect(() => {
    dispatch(getAllProductsThunk(productsObj));
  }, [dispatch]);

  if (!productsObj) return null;
  if (!valentineProducts.length) return null;

  return (
    <div>
      {currUser ? (
        <div className="home-header-pink">
          Welcome back,&nbsp;{`${currUser.first_name} ${currUser.last_name}`}
        </div>
      ) : (
        <div className="home-header-pink">
          Picks so sweet you'll make them blush
        </div>
      )}
      <div className="home-circles-outer">
        <div className="home-header-back-drop-pink"></div>

        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[0]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Valentine</div>
        </div>
      </div>

      <div className="display-product-main">
        {displayProducts?.map((product, i) => {
          return (
            <div className={`display-product-outer img${i}`}>
              <NavLink to={`/products/${product.id}`}>
                <div className="display-img-outer">
                  <img
                    src={product.previewImage}
                    className={`display-product-img img${i}`}
                    alt={product.id}
                  />
                </div>
                <div className="display-product-price">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductsBrowser;
