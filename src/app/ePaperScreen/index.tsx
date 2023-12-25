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
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [data, setData] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false) as any;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    setIsLoading(true);
    let filter = `?sort=createdAt:DESC`;
    let url = `https://ec2.suprabhaathamapi.com/api/e-papers` + filter;
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
  const handleClick = (item: any, id: any) => {
    navigate(`/one-e-paper/${id}`, { state: { item: item, id: id } });
  };
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <div className="homeScrn-main">
            <div className="homeScrn-Container">
              <div className="hmeScrn-EpaperCrdMain">
                {data?.map((item: any) => {
                  return (
                    <>
                      {item.attributes.image ? (
                        <div
                          className="hmeScrn-EpaperCard"
                          onClick={() => handleClick(item, item.id)}
                        >
                          <Document
                            file={item?.attributes?.image}
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
