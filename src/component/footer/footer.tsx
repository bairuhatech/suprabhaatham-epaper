import React from "react";
import "./footer.css";
import { Row, Col } from "react-bootstrap";

function Footer() {
	return (
		<div className="footerMainHead">
			<div>
				For epaper related feedback and queries please call us on : +91 7892 794
				002 or email us on : sudeer@erelego.com
			</div>
			<div>
				For digital advertisement queries please call us on : +91 9164 161 830
				or email us on : sudeer@erelego.com and shrivatsa.rao@erelego.com
			</div>
			<div className="footerRowHead">
				<Row className="footerRow">
					<Col>About Us</Col>
					<Col style={{ whiteSpace: "nowrap" }}>Contact Us</Col>
					<Col style={{ whiteSpace: "nowrap" }}>Privacy Policy</Col>
					<Col style={{ whiteSpace: "nowrap" }}>Kannada news paper</Col>
				</Row>
			</div>
			<div className="mt-2">
				© 2018 eReleGo Made in India. Designed by eReleGo Digi Media Pvt Ltd
			</div>
		</div>
	);
}

export default Footer;
