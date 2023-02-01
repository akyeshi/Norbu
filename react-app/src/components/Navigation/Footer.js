import React from "react";
import "./Navigation.css";
// import footer from "../images/footer.svg";

const Footer = () => {
  return (
    <div className="footer-main-container">
      {/* <div className="footer-img-container">
        <img src={footer} className="main-footer-img" alt=""></img>
      </div> */}
      {/* <div className="footer-middle"></div> */}
      <div className="footer-lower">
        <div className="socials-main">
          <div className="footer-middle-left">
            <div className="footer-happily-header">
              © 2023 Norbu
              <span className="footer-happily-description">
                An e-commerce site for demonstration purposes only.
              </span>
            </div>
          </div>
          <div className="footer-middle-right">
            <div className="socials-inner">
              <div>
                <a
                  href="https://github.com/akyoshicode/Norbu.git"
                  className="social-link"
                  target="_blank"
                ><i className="fa-brands fa-github"></i></a>
              </div>
            </div>

            <div className="socials-inner">
              {/* <div><i className="fa-brands fa-linkedin"></i></div> */}
              <div>
                <a
                  href="https://linkedin.com/in/akyeshi"
                  className="social-link"
                  target="_blank"
                ><i className="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
