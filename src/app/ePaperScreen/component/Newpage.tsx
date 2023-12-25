import React from "react";
import "../style.scss";
import { API } from "../../../Config/API";
import { message } from "antd";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { useParams } from "react-router-dom";

function Epaper({ close }: any) {
  const { id }: any = useParams();
  const storedData: any = localStorage.getItem("cropedData");
  const predata = JSON.parse(storedData);

  const closeNewTab = () => {
    window.close();
  };

  const Url = API.BASE_URL + `one-e-paper/` + id;
  const handleUrlCopy = () => {
    navigator.clipboard.writeText(Url).then(() => {
      message.success("link copied");
    });
  };
  const printEpaper = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Write the content to be printed in the new window
    if (printWindow) {
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>E-paper Suprabhaaatham</title>
        <style>
          .imgSrc {
            width: 100%;
          }

          @media print {
            .imgSrc {
              -webkit-print-color-adjust: exact; /* For WebKit browsers */
              print-color-adjust: exact; /* For other browsers */
            }
          }
        </style>
      </head>
      <body>
        <h1>Epaper Content</h1>
        <img class="imgSrc" src="${predata}" alt="Image">
      </body>
      </html>
      `);

      // Close the document to ensure proper rendering
      printWindow.document.close();

      // Trigger the print dialog
      printWindow.print();
    } else {
      alert("Pop-up blocked. Please allow pop-ups for this website.");
    }
  };

  // Call the print function when needed

  return (
    <div className="Container">
      <div className="optionBttn">
        <button className="optnBtn1" onClick={closeNewTab}>
          <img
            width="34"
            height="34"
            src="https://img.icons8.com/ios-filled/50/circled-left.png"
            alt="circled-left"
          />
        </button>

        <button className="optnBtn" onClick={() => printEpaper()}>
          <img
            width="34"
            height="34"
            src="https://img.icons8.com/glyph-neue/64/print.png"
            alt="print"
          />
        </button>
        <button className="optnBtn">
          <FacebookShareButton url={API.BASE_URL + `one-e-paper/` + id}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/glyph-neue/64/facebook-new.png"
              alt="facebook-new"
            />
          </FacebookShareButton>
        </button>
        <button className="optnBtn">
          <WhatsappShareButton url={API.BASE_URL + `one-e-paper/` + id}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/3d-fluency/94/whatsapp.png"
              alt="whatsapp"
            />
          </WhatsappShareButton>
        </button>
        <button className="optnBtn">
          <TwitterShareButton url={API.BASE_URL + `one-e-paper/` + id}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/color/48/twitterx.png"
              alt="twitter--v1"
            />
          </TwitterShareButton>
        </button>
        <button className="optnBtn" onClick={handleUrlCopy}>
          <img
            width="34"
            height="34"
            src="https://img.icons8.com/ios-filled/50/link--v1.png"
            alt="link--v1"
          />
        </button>
      </div>
      <div className="img-zoom-container">
        <div className="imgDiv">
          <img className="imgSrc" src={predata} alt="Image" />
        </div>
        <div className="adsArea">
          <img
            className="adsImg"
            src="https://amaron-prod-images.s3.ap-south-1.amazonaws.com/s3fs-public/styles/print_gallery/public/Photo%20Gallery/Amaron%20GDN_1.jpg?itok=ANzYkFxh"
            alt=""
          />
          <img
            className="adsImg"
            src="https://amaron-prod-images.s3.ap-south-1.amazonaws.com/s3fs-public/styles/print_gallery/public/Photo%20Gallery/Amaron%20GDN_1.jpg?itok=ANzYkFxh"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Epaper;
