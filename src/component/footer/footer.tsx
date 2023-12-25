import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { LiaYoutube } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import Logo from "../../asset/images/SuprabhathamLogoWhite.svg";

import "./footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <Row>
        <Col md={1} sm={1} xs={2} />
        <Col md={3} sm={11} xs={22}>
          <div className="footer-box1">
            {/* <Logo /> */}
            <img
              src={Logo}
              width={"100px"}
              height={"50px"}
              style={{ cursor: "pointer" }}
            />
            <div className="socialicon-container">
              <AiOutlineInstagram
                size={20}
                color="#ffffff"
                style={{ cursor: "pointer" }}
              />
              <CiFacebook
                size={20}
                color="#ffffff"
                style={{ cursor: "pointer" }}
              />
              <FaXTwitter
                size={16}
                color="#ffffff"
                style={{ cursor: "pointer" }}
              />
              <LiaYoutube
                size={20}
                color="#ffffff"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="footer-icon-text1" style={{ cursor: "pointer" }}>
              <MdOutlineEmail size={15} color={"#aa9678"} />
              <a href="mailto:info@binthamid.com"> info@suprabhaatham.com</a>
            </div>
            <div className="footer-icon-text1" style={{ cursor: "pointer" }}>
              <MdOutlineEmail size={15} color={"#aa9678"} />
              <a href="mailto:sales@bhluae.com.com">info@suprabhaatham.com </a>
            </div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-text1"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              <SlLocationPin size={15} color={"#aa9678"} />
              Suprabhaatham calicut,kerala
            </a>
          </div>
        </Col>
        <Col md={2} sm={12} xs={24}>
          <div className="footer-coloumn">
            <div className="footer-text-2">News</div>
            <div className="footer-text-2">Gulf News</div>
            <div className="footer-text-2">Sports</div>
            <div className="footer-text-2">Career</div>
          </div>
        </Col>
        <Col md={2} sm={12} xs={24}>
          <div className="footer-coloumn">
            <div className="footer-text-2">Science Tech</div>
            <div className="footer-text-2">Life Style</div>
            <div className="footer-text-2">Editorial</div>
            <div className="footer-text-2">Money</div>
          </div>
        </Col>
        <Col md={2} sm={12} xs={24}>
          <div className="footer-coloumn">
            <div className="footer-text-2">Education</div>
            <div className="footer-text-2">Crime</div>
            <div className="footer-text-2">Traval</div>
            <div className="footer-text-2">Tourism</div>
          </div>
        </Col>
      </Row>
      <div className="h-line"></div>
      <div className="footer-copyright">
        &copy;suprbhatham, 2023 All rights reserved. &nbsp;{" "}
        <span style={{ color: "#ffffff" }}>privacy policy</span>
      </div>
    </div>
  );
}

export default Footer;
