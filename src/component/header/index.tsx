import React from "react";
import "./style.scss";
import { Row, Col } from "antd";
import { FiMenu } from "react-icons/fi";
import Logo from "../../asset/images/suprabhathamlogo.svg";
import Live from "../../asset/images/live-32.svg";
import Twitter from "../../asset/images/twitter.svg";
import Facebook from "../../asset/images/facebook.svg";
import Instagram from "../../asset/images/instagram.svg";
function Header() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
      }}
    >
      <Col
        md={24}
        xs={24}
        style={{
          height: 100,
        }}
      >
        <Row>
          <Col md={8} xs={4}>
            <Row>
              <Col md={12}>
                <div className="header-MenuIcon">
                  <FiMenu
                    className="fiMenuIcon"
                    color="#0055A6"
                    cursor={"pointer"}
                    //   onClick={() => setShow(!show)}
                  />
                </div>
              </Col>
              <Col md={12} className="d-none d-md-block">
                <div className="header-dateDiv">
                  <div className="dateTime1 me-2">{new Date().getDate()}</div>
                  <div className="dateTime2">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                    }).format(new Date())}
                    <div className="dateTime3">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      }).format(new Date())}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={8} xs={16}>
            <Col className="header-logoCol">
              <img className="header-logoImg" src={Logo} alt="" />
            </Col>
          </Col>
          <Col md={8} xs={4}>
            <Row
              justify={"space-evenly"}
              align={"middle"}
              style={{ height: 100 }}
            >
              <Col className="d-none d-md-block">
                <img src={Live} alt="" />
              </Col>
              <Col className="d-none d-md-block">
                <img src={Facebook} alt="" />
              </Col>
              <Col className="d-none d-md-block">
                <img src={Instagram} alt="" />
              </Col>
              <Col>
                <img src={Twitter} alt="" />
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </nav>
  );
}

export default Header;
