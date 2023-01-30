import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { loadMyProductsThunk, resetProductsThunk } from "../../store/products";
import MyProduct from "./MyProduct";
import "./Product.css";

const ShopManager = () => {
  //load user products
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);

  useEffect(() => {
    dispatch(loadMyProductsThunk());
    // return () => {
    //   dispatch(acResetProducts())
    // }
  }, [dispatch]); 

  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="my-products-main">
      <div style={{display: 'flex', flexDirection: 'column'}} className="my-products-upper">
        <div style={{textAlign: 'center'}} className="my-products-header">Shop Manager</div>
        {currentUser?.first_name && (
          <div 
            style={{
              color: 'red', 
              display: 'flex', 
              justifyContent: 'center' 
              }} className="my-products-shop">
      
              {`${currentUser?.first_name} ${currentUser?.last_name}`}
      
            &nbsp;
            <i className="fa-solid fa-angle-right"></i>
          </div>
        )}
      </div>

      <div className="my-products-outer">
        <div className="my-products-inner">
          {productsArr.map((product) => (
            <MyProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopManager;
