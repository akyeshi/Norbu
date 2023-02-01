import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginFormModal/LoginForm";
import SignUpForm from "./components/auth/SignupFormModal/SignUpForm";
import NavBar from "./components/Navigation/NavBar";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/auth/UsersList";
import User from "./components/auth/User";
import { authenticate } from "./store/session";

import ProductsBrowser from "./components/Product/BrowseProducts";
import CreateProduct from "./components/Product/CreateProducts";
import ProductDetails from "./components/Product/ProductDetails";
import ProductsBySearch from "./components/Product/ProductsBySearch";
import ShopManager from "./components/Product/ShopManager";

import LoadUserReviews from "./components/Review/LoadUserReviews";
import CreateReviewForm from "./components/Review/CreateReviewForm";
import EditReviewForm from "./components/Review/EditReviewForm";

import PageNotFound from "./components/Product/PageNotFound";
import Footer from "./components/Navigation/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ProductsBrowser />
        </Route>
        <Route exact path="/search/:keyword">
          <ProductsBySearch />
        </Route>

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

        <Route path="/products/:productId" exact={true}>
          <ProductDetails />
        </Route>
        <Route path="/new-product" exact={true}>
          <CreateProduct />
        </Route>
        <Route path="/shop-manager" exact={true}>
          <ShopManager />
        </Route>

        <Route path="/my-reviews" exact={true}>
          <LoadUserReviews />
        </Route>
        <Route path="/products/:productId/new-review" exact={true}>
          <CreateReviewForm />
        </Route>
        <Route path="/reviews/:reviewId/edit-review" exact={true}>
          <EditReviewForm />
        </Route>

        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
