import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../auth/LoginFormModal";
import logo from "../images/norbu-logo.png";
import "./Navigation.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  // console.log('user -----------\n', user)

  return (
    <nav>
      <div className="navBar-main">
        <div className="navBar-outer">
          <div className="navBar-link">
            <NavLink exact to="/" activeClassName="active">
              <div className="navBar-home">
                <img src={logo} alt="logo" className="logo" />
              </div>
            </NavLink>
          </div>

          <SearchBar />

          {user ? (
            <>
              <div className="navBar-link-icon">
                <NavLink to="/favourites" exact={true} activeClassName="active">
                  <i className="fa-regular fa-heart"></i>
                </NavLink>
              </div>

              <div className="navBar-link-icon">
                <i
                  className="fa-regular fa-bell"
                  style={{ marginRight: 5 }}
                ></i>
                <i class="fa-solid fa-sort-down"></i>
              </div>

              <div className="navBar-link-icon">
                <NavLink
                  to="/shop-manager"
                  exact={true}
                  activeClassName="active"
                >
                  <i className="fa-solid fa-store"></i>
                </NavLink>
              </div>

              <div className="navBar-link-profile">
                <ProfileButton user={user} />
              </div>
            </>
          ) : (
            <>
              <div className="navBar-link sign-in">
                <LoginFormModal />
              </div>
            </>
          )}
          <div className="navBar-link-icon">
            <NavLink to="/cart" exact={true} activeClassName="active">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
