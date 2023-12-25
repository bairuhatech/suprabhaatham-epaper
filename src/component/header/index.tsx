// import React from "react";
// import "./style.scss";
// import { Row, Col } from "antd";
// import { FiMenu } from "react-icons/fi";
// import Logo from "../../asset/images/suprabhathamlogo.svg";
// import Live from "../../asset/images/live-32.svg";
// import Twitter from "../../asset/images/twitter.svg";
// import Facebook from "../../asset/images/facebook.svg";
// import Instagram from "../../asset/images/instagram.svg";
// function Header() {
//   return (
//     <nav
//       style={{
//         position: "sticky",
//         top: 0,
//         zIndex: 100,
//         background: "#fff",
//       }}
//     >
//       <Col
//         md={24}
//         xs={24}
//         style={{
//           height: 100,
//         }}
//       >
//         <Row>
//           <Col md={8} xs={4}>
//             <Row>
//               <Col md={12}>
//                 {/* <div className="header-MenuIcon">
//                   <FiMenu
//                     className="fiMenuIcon"
//                     color="#0055A6"
//                     cursor={"pointer"}
//                     //   onClick={() => setShow(!show)}
//                   />
//                 </div> */}
//               </Col>
//               <Col md={12} className="d-none d-md-block">
//                 <div className="header-dateDiv">
//                   <div className="dateTime1 me-2">{new Date().getDate()}</div>
//                   <div className="dateTime2">
//                     {new Intl.DateTimeFormat("en-US", {
//                       weekday: "long",
//                     }).format(new Date())}
//                     <div className="dateTime3">
//                       {new Intl.DateTimeFormat("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                         hour: "numeric",
//                         minute: "numeric",
//                         second: "numeric",
//                         hour12: true,
//                       }).format(new Date())}
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//           <Col md={8} xs={16}>
//             <Col className="header-logoCol">
//               <img className="header-logoImg" src={Logo} alt="" />
//             </Col>
//           </Col>
//           <Col md={8} xs={4}>
//             <Row
//               justify={"space-evenly"}
//               align={"middle"}
//               style={{ height: 100 }}
//             >
//               {/* <Col className="d-none d-md-block">
//                 <img src={Live} alt="" />
//               </Col> */}
//               <Col className="d-none d-md-block">
//                 <img src={Facebook} alt="" />
//               </Col>
//               <Col className="d-none d-md-block">
//                 <img src={Instagram} alt="" />
//               </Col>
//               <Col>
//                 <img src={Twitter} alt="" />
//               </Col>
//               <Col></Col>
//             </Row>
//           </Col>
//         </Row>
//       </Col>
//     </nav>
//   );
// }

// export default Header;
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { LuUserCircle } from "react-icons/lu";
import { MdOutlineLiveTv } from "react-icons/md";
import Twitter from "../../asset/images/iconstwitterxwithblack.svg";
import Logo from "../../asset/images/SuprabhathamLogoBlack.svg";
import "./style.css";
import Timer from "./time";

const Header = (props: any) => {
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});

  // const user =
  //   typeof window !== "undefined" &&
  //   window.JSON.parse(localStorage.getItem("user") || "{}");
  const google =
    typeof window !== "undefined" &&
    window.JSON.parse(localStorage.getItem("user") || "{}");
  // const facebook =
  //   typeof window !== "undefined" &&
  //   window.JSON.parse(localStorage.getItem("facebookdetails") || "{}");
  // let userData: any = user.username
  //   ? user
  //   : google.displayName
  //   ? google
  //   : facebook;

  useEffect(() => {}, []);

  // const LoginClick = () => {
  //   // if (userData?.username || userData?.displayName) {
  //   //   navigate("/");
  //   // } else {
  //     navigate("/loginscreen");
  //   // }
  // };

  return (
    <nav className="Header-MainBox">
      <div className="Header-SubBox">
        <Container fluid={true} className="Header-Container">
          <Row>
            <Col sm={1} xs={12}></Col>
            <Col sm={3} xs={2}>
              <div className="Header-IconBox">
                <div onClick={() => setShow(true)}>
                  <FiMenu size={30} color="#0055A6" />
                </div>
                <div className="Header-Icons">
                  <Timer />
                </div>
                <div></div>
              </div>
            </Col>
            <Col sm={4} xs={8}>
              <div className="Header-LogoBox">
                <div className="Header-space" />
                <img src={Logo} style={{ width: "250px" }} />
                <div className="Header-Logotxt">
                  <span className="Header-txt5">LIVE TV</span> |
                  <span className="Header-txt5"> APP</span>
                </div>
              </div>
            </Col>
            {/* <Col  sm={1}></Col> */}
            <Col sm={3} xs={2}>
              <div className="Header-IconBox">
                <div className="Header-Icons">
                  <MdOutlineLiveTv size={24} color="red" />
                </div>
                <div className="Header-Icons">
                  <img src={Twitter} />
                </div>
                <div
                  // onClick={() => setShow(true)}
                  className="Header-Icons"
                >
                  <FaInstagram size={24} />
                </div>
                <div className="Header-Icons ">
                  <BiLogoFacebook size={24} />
                </div>

                <div className="Header-Icons2">
                  <LuUserCircle cursor={"pointer"} size={27} color="gray" />
                </div>

                {/* {userData?.username || userData?.displayName ? (
                  <Popover
                    placement="bottomRight"
                    arrow={false}
                    content={<UserPopover user={userData} />}
                    trigger="click"
                  >
                    <div className="Header-Icons2">
                      <LuUserCircle size={27} color={"grey"} />
                    </div>
                  </Popover>
                ) : (
                  <div className="Header-Icons2" onClick={() => LoginClick()}>
                    <LuUserCircle size={27} color="gray" />
                  </div>
                )} */}
              </div>
            </Col>
            <Col sm={1} xs={12}></Col>
          </Row>
        </Container>
      </div>
    </nav>
  );
};

export default Header;
