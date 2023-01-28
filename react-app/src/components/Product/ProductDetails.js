import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneProductThunk } from "../../store/products";
import noimage from "../images/noimage.jpg"
import { FaStar } from "react-icons/fa";
import "./Product.css";

const ProductDetails = () => {
  const history = useHistory();
  const { productId } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.singleProduct)[0];
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  let currentUser;

  useEffect(async () => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch, productId]);

  let seller = false;
  if (sessionUser?.id === product?.sellerId) seller = true;
  if (!product) return null;

  if (sessionUser && product) {
    if (sessionUser.id === product.seller_Id) {
      currentUser = false;
    } else currentUser = true;
  }
  const options = [];
  for (let i = 1; i <= product.stock; i++) {
    options.push(i);
  }

  return (
    <div>
      <div className="single-product-wrapper">
        <div className="product-left-part">
          <div className="product-image-main">
            <div className="product-preview-image-outer">
              {product.productImages.length > 0 &&
                product.productImages.map((image, i) => {
                  return (
                    <img
                      src={image}
                      className="product-preview-image"
                      key={i}
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                      style={{ height: 200, width: 200 }}
                      alt="productimage"
                    ></img>
                  );
                })}
              {!product.productImages.length && (
                <img
                  src={noimage}
                  className="product-preview-image"
                  onClick={() => {
                    setSelectedImage(noimage);
                  }}
                  style={{ height: 200, width: 200 }}
                  alt="noimage"
                ></img>
              )}
            </div>
            <div className="product-main-image-outer">
              {!product.productImages.length && (
                <img
                  src={selectedImage ? selectedImage : noimage}
                  className="product-main-image"
                  alt="productimage"
                ></img>
              )}
              {product.productImages.length > 0 && (
                <img
                  src={selectedImage ? selectedImage : product.productImages[0]}
                  className="product-main-image"
                  alt="productimage"
                ></img>
              )}
            </div>
          </div>
        </div>

        <div className="product-right-part"></div>
        <div className="single-product-seller">{product.seller}</div>
        <div className="single-product-sales">
          {product.salesNumber} sales{" "}
          <span className="vertical-seperate">|</span>
          <span className="product-detail-avgrating-star">
            {product.avgRating && Number(product.avgRating) % 1 ? (
              <span>
                {[...Array(Math.floor(product.avgRating))].map((star) => (
                  <i className="fa-solid fa-star"></i>
                ))}
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
              </span>
            ) : (
              <span>
                {[...Array(product.avgRating)].map((star) => (
                  <i className="fa-solid fa-star"></i>
                ))}
              </span>
            )}
            {!product.avgRating && (
              <span>
                {[...Array(5)].map((star) => (
                  <FaStar className="prod-star" color="#e4e5e9" size={16.5} />
                ))}
              </span>
            )}
          </span>
        </div>

        <div className="single-product-name">{product.name}</div>

        <div className="single-product-price">
          ${Number(product.price).toFixed(2)}
        </div>

        <div className="single-product-stock">Stock: {product.stock}</div>
        <div className="single-product-quantity">
          <select
            className="product-input-quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="single-product-description">Description</div>
        <div className="single-product-description-content">
          {" "}
          {product.description}
        </div>
        <div className="single-product-shipping">Cost to ship</div>
        <div className="free-shipping">Free</div>
        <div className="free-shipping-message">
          Artsy offsets carbon emissions from shipping and packaging on this
          purchase.
        </div>
        <div className="return-exchange-div">
          <div>
            <div className="return-exchange-smalltext">Returns & exchanges</div>
            <div className="return-exchange-bigtext">Accepted</div>
            <div className="return-exchange-smalltext">
              Exceptions may apply
            </div>
          </div>
          <div>
            <div className="return-exchange-smalltext">
              Return & exchange window
            </div>
            <div className="return-exchange-bigtext">30 days</div>
            <div className="return-exchange-smalltext">from item delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
