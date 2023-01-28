import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./Navigation.css";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="navbar-profile-container">
      <div onClick={openMenu} className="navbar-profile-button">
        <i className="fa-solid fa-user" style={{ marginRight: 5 }}></i>
        {/* <i class="fa-solid fa-circle-user"></i> */}
        <i class="fa-solid fa-sort-down"></i>
      </div>
      {showMenu && (
        <>
          <div className="profile-dropdown">
            <div className="dropdown-item-top">
              <div className="profile-user-img">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="profile-name">{`${user.first_name} ${user.last_name}`}</div>
            </div>
            <NavLink to="/my-reviews" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <div className="my-reviews-img">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="my-reviews">My Reviews</div>
              </div>
            </NavLink>
            <NavLink to="/new-product" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <div>
                  <i className="fa-solid fa-shop"></i>
                </div>
                <div className="my-products">Sell on Norbu</div>
              </div>
            </NavLink>
            {/* <div className='dropdown-item'>
            <div className='sign-out-img'><i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i></div> */}
            <LogoutButton />
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
