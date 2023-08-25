import React, { useRef } from "react";
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
  console.log("=======data=======",data)
  const ref = useRef<any>();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
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
