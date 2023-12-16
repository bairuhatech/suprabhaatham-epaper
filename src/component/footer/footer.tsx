import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillYoutube } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { Link } from "react-router-dom";
import Twitter from "../../asset/images/iconstwitterxwithblack.svg";
import "./footer.css";

const Footer = () => {
  const Head = {
    textDecoration: "none",
    color: "#ffff",
  };
  const Links = {
    textDecoration: "none",
    color: "#ffff",
    fontWeight: 200,
    fontSize: 12,
  };

  return (
    <main className="footerContainer">
      <Row>
        <Col md={24} style={{ textAlign: "center" }}>
          <div className="drawerEdition">
            <a> Kozhikode </a>|<a> Kannur </a>|<a> Palakkad </a>|
            <a> Malappuram </a>|<a> Kochi </a>|<a> Thrissur </a>|
            <a> Thiruvananthapuram</a>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <div className="disanceIcon">
              <Link to="https://www.facebook.com/Suprabhaatham/">
                <CgFacebook size={22} color="#d4d4d4" />
              </Link>
            </div>
            <div className="disanceIcon">
              <Link to="https://www.instagram.com/suprabhaathamonline/?hl=en">
                <FaInstagram size={22} color="#d4d4d4" />
              </Link>
            </div>
            <div className="disanceIcon">
              <Link to="https://chat.whatsapp.com/LuNRfhZ5PAQEuucnQ2QW1H">
                <ImWhatsapp size={20} color="#d4d4d4" />
              </Link>
            </div>
            <div className="disanceIcon">
              <Link to="https://www.youtube.com/@Suprabhaatham2023">
                <AiFillYoutube size={22} color="#d4d4d4" />
              </Link>
            </div>
          </div>
          <br />
          {/* <Col span={24}> <img src={logo} alt="Logo" />
                <Row>
                  <Col
                    span={10}
                    className="DrawerprivacyPolicyTxt"
                    style={{ textAlign: "end", paddingRight: "3%" }}
                  >
                    Support
                  </Col>
                  <Col
                    span={3}
                    className="DrawerprivacyPolicyTxt"
                    style={{ textAlign: "center" }}
                  >
                    Privacy Policy
                  </Col>
                  <Col
                    span={3}
                    className="DrawerprivacyPolicyTxt3"
                    style={{ textAlign: "center" }}
                  >
                    Terms of Use
                  </Col>
                </Row>
              </Co l> */}
          <Link to="/frameCreator/" className="no-underline">
            <h2 className="copyright">Frame Creator</h2>
          </Link>
          <div className="copyright">
            ©suprbhatham, 2023 All rights reserved. &nbsp;{" "}
            <Link className="no-underline" to="/privacyPolicy">
              <span style={{ color: "#ffffff" }}>privacy policy</span>
            </Link>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default Footer;
