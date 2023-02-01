import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
import Footer from "../Navigation/Footer.js";
import "./Product.css";

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

  const valentineProducts = productArr.filter(
    (product) => product.category === "Valentine"
  );
  const weddingNpartyProducts = productArr.filter(
    (product) => product.category === "Wedding & Party"
  );
  const homeNlivingProducts = productArr.filter(
    (product) => product.category === "Home & Living"
  );
  const clothingNshoesProducts = productArr.filter(
    (product) => product.category === "Clothing & Shoes"
  );
  const giftNcardsProducts = productArr.filter(
    (product) => product.category === "Gifts & Gift Cards"
  );
  const artNcollectibleProducts = productArr.filter(
    (product) => product.category === "Art & Collectibles"
  );

  const randomProducts = productArr.sort(() => 0.5 - Math.random());
  const displayProducts = randomProducts.slice(0, 8);
  const sponsoredProducts = randomProducts.slice(8, 13);
  const editorPickedProducts = randomProducts.slice(3, 8);
  // const editorPickedProducts = randomProducts.slice(13, 18)

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


        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[1]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Wedding & Party</div>
        </div>


        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[2]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Home & Living</div>
        </div>


        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[3]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Clothing & Shoes</div>
        </div>


        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[4]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Gifts & Gift Cards</div>
        </div>


        <div className="circle-container">
          <NavLink to={`/products/${valentineProducts[0]?.id}`}>
            <div className="img-outer">
              <img
                src={valentineProducts[5]?.previewImage}
                className="featured-img"
                alt="featured"
              ></img>
            </div>
          </NavLink>
          <div className="category-name">Art & Collectibles</div>
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

      <div className="sponsored-products-main">
        <div className="sponsored-product-header">
          <div
            style={{ fontSize: 18, fontWeight: "bold" }}
            className="sponsored-product-top-outer"
          >
            Sponsored
            <span>
              <i class="fa-regular fa-circle-question"></i>
            </span>
            <span
              style={{ fontSize: 35, fontWeight: "bold" }}
              className="sponsored-product-top"
            >
              {" "}
              By Norbu sellers
            </span>
          </div>
          <div className="sponsored-product-subtitle">
            behind every sponsored item there is an Etsy seller hoping you'll
            check out their shop.
          </div>
        </div>
        {sponsoredProducts?.map((product, i) => {
          return (
            <div className={`sponsored-product-outer s-img${i}`} key={i}>
              <NavLink to={`/products/${product.id}`}>
                <div className="sponsored-img-outer">
                  <img
                    src={product.previewImage}
                    className={`sponsored-product-img s-img${i}`}
                    alt={product.id}
                  ></img>
                </div>
                <div className="sponsored-product-price">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className="edit-pick-products-main">
        <div className="edit-pick-products-header">
          Editors' Picks
          {/* <span><i className="fa-solid fa-arrow-right"></i></span> */}
          {/* <img className='unique-right-arrow' src={rightArrow}></img> */}
        </div>

        {/* <div>Valentine's Day Gifts</div> */}

        <div className="edit-pick-subtitle">
          Explore extraordinary ways—from extraordinary sellers!—to express your
          love
        </div>
        {editorPickedProducts?.map((product, i) => {
          return (
            <div className={`edit-pick-product-outer e-img${i}`} key={i}>
              <NavLink to={`/products/${product.id}`}>
                <div className="edit-pick-img-outer">
                  <img
                    src={product.previewImage}
                    className={`edit-pick-product-img e-img${i}`}
                    alt="product"
                  ></img>
                </div>
                <div className="edit-pick-product-price">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};
export default ProductsBrowser;
