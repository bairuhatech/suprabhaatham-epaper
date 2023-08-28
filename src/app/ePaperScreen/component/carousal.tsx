import React, { useRef, useState } from "react";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
function CarousalEpaper(props: any) {
  const location = useLocation();
  let data = location?.state?.attributes?.epapercollections[0];
  const ref = useRef<any>();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };
  const openWindow = (item: any) => {
    const newWindow = window.open(
      "",
      "",
      "width=1400,height=1400,scrollbars=1"
    );

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Image Viewer</title>
            <style>
     
              .img-zoom-container {
                position: relative;
                display: flex;
                width: 100%;
                height:100%;
    
              }
              .imgSrc {
                object-fit: cover;
                cursor: zoom-in;
                width:100%;
              }
              .imgDiv{
                width:70%;
                height:100%;
              }
              .adsArea{
                width:30%;
 
                height:100%;
                padding:20px;
              }
              .adsImg{
                object-fit: cover;
                height:100%;
                width:100%;
              }
              .optionBttn{
                width:100%;
                height:50px;
                margin-bottom:20px;

              }
              .optnBtn{
                width:16.3%;
                border:none;
                overflowX:scroll;
                border-left:2px solid red
                background-color:#ebebeb;
                border-radius:6px;
                padding:10px;
                cursor:pointer;
              }
              .optnBtn1{
                width:16.3%;
                background-color:#ebebeb;
                border:none;
                border-radius:6px;
                padding:10px;
                                cursor:pointer;

              }
            </style>
            <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </head>
        <body>
        <div class="Container">
        <div class="optionBttn">
        <button class="optnBtn1"><img width="34" height="34" src="https://img.icons8.com/ios-filled/50/circled-left.png" alt="circled-left"/></button>
        <button class="optnBtn"><img width="34" height="34" src="https://img.icons8.com/glyph-neue/64/print.png" alt="print"/></i></button>
        <button class="optnBtn"><img width="34" height="34" src="https://img.icons8.com/glyph-neue/64/facebook-new.png" alt="facebook-new"/></button>
        <button class="optnBtn"><img width="34" height="34" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp"/></button>
        <button class="optnBtn"><img width="34" height="34" src="https://img.icons8.com/color/48/twitter--v1.png" alt="twitter--v1"/></button>
        <button class="optnBtn"><img width="34" height="34" src="https://img.icons8.com/ios-filled/50/link--v1.png" alt="link--v1"/></button>
        </div>
        <div class="img-zoom-container">
        <div class="imgDiv">
        <img class="imgSrc" src="${item?.imageUrl}" alt="Image">
        </div>
        <div class="adsArea">
        <img class="adsImg" src="https://amaron-prod-images.s3.ap-south-1.amazonaws.com/s3fs-public/styles/print_gallery/public/Photo%20Gallery/Amaron%20GDN_1.jpg?itok=ANzYkFxh" alt=""/>
        <img class="adsImg" src="https://amaron-prod-images.s3.ap-south-1.amazonaws.com/s3fs-public/styles/print_gallery/public/Photo%20Gallery/Amaron%20GDN_1.jpg?itok=ANzYkFxh" alt=""/>
        </div>
        </div>
       
        </div>
        </body>
        </html>
        `);
    } else {
      alert("Pop-up blocked. Please allow pop-ups for this website.");
    }
  };

  return (
    <div>
      <Header />
      <div className="webStories-main">
        <div style={{ width: "99%" }}>
          <div className="webStories-scrollBox">
            {data?.length > 4 ? (
              <button
                className="webStories-scrollbutton1"
                onClick={() => scroll(-300)}
              >
                <MdOutlineKeyboardArrowLeft color="white" />
              </button>
            ) : null}
            <div className="webStories-scroll" ref={ref}>
              {data?.length &&
                data?.map((item: any) => {
                  return (
                    <div className="webStories-ImgDiv">
                      <img
                        className="webStories-image"
                        src={item?.imageUrl}
                        alt=""
                        onClick={() => openWindow(item)}
                      ></img>
                    </div>
                  );
                })}
            </div>
            {data?.length > 4 ? (
              <button
                className="webStories-scrollbutton2 "
                onClick={() => scroll(300)}
              >
                <MdOutlineKeyboardArrowRight color="white" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarousalEpaper;
