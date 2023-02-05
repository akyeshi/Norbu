import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getCartItemsThunk } from "../../store/carts.js"; 
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import "./Cart.css";
import { authenticate } from "../../store/session";
import LoginFormModal from "../auth/LoginFormModal/index.js";



const Cart = () => {
  // const [loaded, setLoaded] = useState(false);
  const history = useHistory(); 
  const [showLogin, setShowLogin] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  // const cartItems = useSelector(state => Object.values(state.cart));

  const cartObj = useSelector((state) => state.cart);
  console.log('cart object: ', cartObj)
  
  const cartItems = Object.values(cartObj);
  console.log('cart items array: ', cartItems)

  // const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  let initialSubtotal = 0;
  if (cartItems) {
    for (let cartItem of cartItems) {
      initialSubtotal += cartItem?.quantity * cartItem?.Product?.price;
    }
  }


  const handleClick = (e) => {
    e.preventDefault()
    setShowLogin(true) && (
      <LoginFormModal />
    )
  }

  // useEffect(() => {
  //     if (sessionUser) {
  //       dispatch(getCartItemsThunk())
  //     }
  //   }, [cartItems?.length])

  useEffect(() => {
    (async () => {
      // await dispatch(authenticate());
      if (sessionUser) {
        await dispatch(getCartItemsThunk());
        setCartLoaded(true);
      }
    })();
  }, [dispatch, cartItems.length]);


  if (!sessionUser) 
    return (
      
      <div 
        className="cart-need-login"
        // onClick={() => history.push("/cart")}
      >Please log in to checkout your cart
      </div>


      // <button
      //   style={{display: 'grid', margin: 'auto'}}
      //   onClick={handleClick} 
      //   >Please log to checkout your cart</button>
      
      
    );

  return (
    cartLoaded && (
      <div className="cart-mostout-div">
        {cartItems?.length > 0 && (
          <div className="cart-leftpart">
            {cartItems?.length > 0 && (
              <h2 className="items-count-in-cart">
                {cartItems.length} item(s) in your cart
              </h2>
            )}
            {cartItems?.length > 0 &&
              cartItems?.map((item, i) => <CartItem key={i} item={item} />)}
          </div>
        )}
        {cartItems?.length > 0 && (
          <CartTotal cartItems={cartItems} initialSubtotal={initialSubtotal} />
        )}
        {!cartItems?.length && (
          <div className="cart-empty-message">
            <h1 className="cart-is-empty">Your cart is empty.</h1>
            <NavLink
              style={{
                color: "black",
              }}
              to="/"
            >
              Discover something unique to fill it up
            </NavLink>
          </div>
        )}
      </div>
    )
  );
};
export default Cart;
