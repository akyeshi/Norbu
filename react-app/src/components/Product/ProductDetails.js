import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetProductThunk, getOneProductThunk } from "../../store/products";
// import {addCartItemThunk, getCartItemsThunk} from "../../store/cartItems"

import LoadProductReviews from "../Review/LoadProductReviews";
import { FaStar } from "react-icons/fa";

import CreateReviewModal from "../Review/CreateReviewModal";
import EditReviewForm from "../Review/EditReviewForm";
// import CreateReviewForm from "../Review/CreateReviewForm";

import Footer from "../Navigation/Footer.js";
import noimage from "../images/noimage.jpg";
// import './productDetails.css'

const ProductDetails = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [showNewReviewModal, setShowNewReviewModal] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.singleProduct)[0];
  const [selectedImage, setSelectedImage] = useState(null);
  const avgRating = product?.avgRating;
  const reviewsObj = useSelector((state) => state.reviews.product);
  const reviewsArr = Object.values(reviewsObj);
  const [quantity, setQuantity] = useState(1);
  let currentUser;

  useEffect(async () => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch, productId, reviewsArr.length]);

  //verify if currentUser is seller of product
  let seller = false;
  if (sessionUser?.id === product?.seller_id) seller = true;

  if (!product) return null;
  // if (!sellerId) return null;
  const addToCart = async () => {
    if (sessionUser) {
      if (sessionUser.id === product.seller_id) {
        await window.alert(
          "You are the owner of this product! You cannot add it to cart"
        );
        return history.push("/");
      }

      return history.push("/cart");
    } else {
      window.alert(`Please sign in to purchase.`);
    }
  };
  if (sessionUser && product) {
    if (sessionUser.id === product.seller_id) {
      currentUser = false;
    } else currentUser = true;
  }
  const options = [];
  for (let i = 1; i <= product.stock; i++) {
    options.push(i);
  }

  const getCartButtonMessage = (stock) => {
    if (stock === 0) return "Out of stock";
    let messageBase = "Add to cart";
    // if (stock <= 5) {
    //       messageBase += ` | Only ${stock} available`
    // }
    return messageBase;
  };
  // const reviewStars = (avgRating) => {
  //   if (avgRating == 0) {
  //       return <span>"New"</span>
  //   } else if (Number.isInteger(avgRating)) {
  //       return <span> <i className="fa-solid fa-star"> *{avgRating}</i></span>
  //   } else {
  //       return <span>{Math.round(avgRating)} * <i className="fa-solid fa-star"></i> + <i className="fa fa-star-half-o" aria-hidden="true"></i></span>
  //   }
  // }

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

          <div className="single-product-reviews">
            <div className="single-product-numReviews">
              {product.numReviews} reviews
              <span className="product-detail-avgrating-star">
                {Number(product.avgRating) % 1 ? (
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
              </span>
            </div>

            {/* only show "create review" button to logged in user/ who has not left a review/ NON-seller */}
            <div>
              {sessionUser &&
                !seller &&
                !product.reviewers.includes(sessionUser.id) && (
                  // (<div>
                  //     <button
                  //         className="create-new-review-button"
                  //         onClick={()=>history.push(`/products/${productId}/new-review`)}
                  //     >
                  //         Create a new review
                  //         {/* <CreateReviewForm productId={productId}/> */}
                  //     </button>
                  // </div>)
                  <CreateReviewModal
                    // <CreateReviewForm
                    productId={productId}
                    showNewReviewModal={showNewReviewModal}
                    setShowNewReviewModal={setShowNewReviewModal}
                  />
                )}
            </div>
            <div className="one-spot-reviews-container">
              <LoadProductReviews productId={productId} user={sessionUser} />
            </div>
          </div>
        </div>
        <div className="product-right-part">
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
                  {[...Array(product.avgRating)].map((star) => (
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
          <div className="single-product-addtocart">
            {currentUser ? (
              <button
                className="add-to-cart-button"
                type="button"
                variant="outlined"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                {getCartButtonMessage(product.stock)}
              </button>
            ) : (
              <button className="not-login-addtocart-button">
                {/* Please log in to purchase */}
                <i class="fa-solid fa-ban fa-xl"></i>
                
              </button>
            )}

            {/* <div className="product-detail-gift">
            <i className="fa-solid fa-gift fa-2xl"></i>
            <div className="product-detail-text">
              <span className="ajw">A sought-after gift</span>
              
            </div>
          </div> */}

            <div className="product-detail-award">
              <i className="fa-solid fa-award fa-2xl"></i>
              <div className="product-detail-text">
                <span className="ajw">Star Seller.&nbsp;</span>This seller
                consistently earned 5-star reviews, shipped on time, and replied
                quickly to any messages they received.
              </div>
            </div>
            <div className="product-detail-truck">
              <i className="fa-solid fa-truck-fast fa-2xl"></i>
              {/* <i className="fa-solid fa-truck-fast fa-2xl"></i> */}
              <div className="product-detail-text">
                <span className="ajw">Nice Choice!&nbsp;</span>Enjoy free shipping to the US when you spend $35+ at this shop.
              </div>
            </div>
          </div>
          <div className="single-product-description">Description</div>
          <div className="single-product-description-content">
            {" "}
            {product.description}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
