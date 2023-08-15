import React from "react";
import "./header.css";
import supLogo from "../../asset/images/suprabhathamlogo.svg";
import { Row, Col } from "react-bootstrap";
import { BiLogoTwitter, BiLogoFacebook } from "react-icons/bi";
import { ImInstagram } from "react-icons/im";
import { AiFillYoutube } from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

function Header() {
	return (
		<div>
			<div className="headerFistSection">Mon Aug 14 2023 19:45:36</div>
			<div className="headerMainSection">
				<Row>
					<Col md={4}>
						<img className="supLogo" src={supLogo} />
					</Col>
					<Col md={7}>
						{/* <BiLogoTwitter />
						<BiLogoFacebook />
						<ImInstagram />
						<AiFillYoutube />
						<BsPinterest /> */}
					</Col>
					<Col md={1}>
						<BiMenu />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Header;
