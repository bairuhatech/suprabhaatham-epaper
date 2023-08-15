import React from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { Row, Col } from "react-bootstrap";
import "./index.css";
import supPaperImg from "../../asset/images/suprabathamPaperImg.jpg";

function HomeScreen() {
	return (
		<div>
			<Header />
			<div className="mainSectionHead">
				<Row>
					<Col md={9}>
						<div className="Heading">Main Editions</div>
						<Row>
							{[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
								<Col md={4} key={index}>
									<div className="boxCol">
										<img src={supPaperImg} alt={`Image ${index}`} />
										<div className="placeAndDate">
											<span>Malappuram</span>
											<span>15-08-2023</span>
										</div>
									</div>
								</Col>
							))}
						</Row>
					</Col>
					<Col md={3}>
						<div className="rightBoxCol"></div>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	);
}

export default HomeScreen;
