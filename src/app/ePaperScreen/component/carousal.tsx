import React, { useRef, useState } from "react";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
function CarousalEpaper(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc =  
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const location = useLocation();
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  let data = location?.state?.attributes?.epapercollections;
  
  const ref = useRef<any>();
  const navigate = useNavigate();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };

  const handleClick = (item: any) => {
    navigate("/one-e-paper", { state: {data: item, news: data} });
  };
  function onDocumentLoadSuccess({ numPages } :any) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  }
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
                    <div className="webStories-ImgDiv"
                    onClick={() => handleClick(item)}>
                       <Document  file={item} 
                  onLoadSuccess={onDocumentLoadSuccess} 
                  >
                  <Page 
                  pageNumber={pageNumber} 
                  width={300} 
                  height={500}
                  renderAnnotationLayer={false}/>
                  
                  </Document>
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
