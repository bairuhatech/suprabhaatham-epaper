import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import moment from "moment";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header";
import Footer from "../../component/footer/footer";
import { Skeleton } from "antd";
function HomeScreen(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc =  
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [data, setData] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(true) as any;
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    let filter = `?sort=createdAt:DESC`;
    let url = `https://suprabhaatham-dev.herokuapp.com/api/e-papers` + filter;
    axios
      .get(url)
      .then((response) => {
        console.log("res", response);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = (item: any) => {
    navigate("/e-paper", { state: item });
  };
  function onDocumentLoadSuccess({ numPages } :any) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  }

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <Header />
          <div className="homeScrn-main">
            <div className="homeScrn-Container">
              <div className="hmeScrn-EpaperCrdMain">
                {data?.map((item: any) => {
                                    return (
                    <>
                      {item.attributes.image ? (
                        <div className="hmeScrn-EpaperCard"
                        onClick={() => handleClick(item)}
                        >
                         <Document  file={item?.attributes?.image} 
                  onLoadSuccess={onDocumentLoadSuccess} 
                  >
                  <Page 
                  pageNumber={pageNumber} 
                  width={300} 
                  height={500}
                  renderAnnotationLayer={false}/>
                  
                  </Document>


                          <div className="hmeScrn-edtrilDist">
                            <div>{item?.attributes?.edition}</div>
                            <div>
                              {moment(item?.attributes?.createdAt).format("L")}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </div>
              <br />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default HomeScreen;
