import React, { useRef, useState } from "react";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
function CarousalEpaper(props: any) {
  const location = useLocation();
  let data: any = location?.state?.attributes?.epapercollections[0];
  const ref = useRef<any>();
  const navigate = useNavigate();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };

  const handleClick = (item: any) => {
    navigate("/one-e-paper", { state: {data: item, news: data} });
  };
  return (
    <div>
      <Header />
      <div className="webStories-main">
        <div style={{ width: "99%" }}>
          <div className="webStories-scrollBox">
            {data?.length > 3 ? (
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
                        onClick={() => handleClick(item)}
                      ></img>
                    </div>
                  );
                })}
            </div>
            {data?.length > 3 ? (
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
