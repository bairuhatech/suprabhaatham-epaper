import React, { useEffect, useRef, useState } from "react";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import axios from "axios";

import { Skeleton } from "antd";
function CarousalEpaper(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const location = useLocation();
  console.log("========location=======", location);
  const [numPages, setNumPages] = useState(null);
  const [Data, setData] = useState([]);
  const [Isloading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  let data = location?.state?.item?.attributes?.epapercollections;
  let newsid = location?.state?.id;
  console.log("======data=====", data);

  const ref = useRef<any>();
  const navigate = useNavigate();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };

  useEffect(() => {
    loadData(newsid);
  }, []);

  const loadData = async (id: any) => {
    console.log("=====id=======", id);
    setIsLoading(true);
    let url = `https://ec2.suprabhaathamapi.com/api/e-papers/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log("res====================", response);
        setData(response.data.data.attributes.epapercollections);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleClick = (item: any) => {
    navigate("/one-e-paper", { state: { data: item, news: data } });
  };
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <Header />
      {Isloading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <div className="webStories-main">
          <div style={{ width: "99%" }}>
            <div className="webStories-scrollBox">
              {Data?.length > 3 ? (
                <button
                  className="webStories-scrollbutton1"
                  onClick={() => scroll(-300)}
                >
                  <MdOutlineKeyboardArrowLeft color="white" />
                </button>
              ) : null}
              <div className="webStories-scroll" ref={ref}>
                {Data?.length &&
                  Data?.map((item: any) => {
                    return (
                      <div
                        className="webStories-ImgDiv"
                        onClick={() => handleClick(item)}
                      >
                        <Document
                          file={item}
                          onLoadSuccess={onDocumentLoadSuccess}
                          loading={<Skeleton active />}
                        >
                          <Page
                            pageNumber={pageNumber}
                            width={300}
                            height={500}
                            renderAnnotationLayer={false}
                            loading={<Skeleton active />}
                          />
                        </Document>
                      </div>
                    );
                  })}
              </div>
              {Data?.length > 3 ? (
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
      )}

      <Footer />
    </>
  );
}

export default CarousalEpaper;
