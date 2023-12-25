import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { Col, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import ReactCrop, { Crop } from "react-image-crop";
import { Document, Page, pdfjs } from "react-pdf";
import "react-image-crop/dist/ReactCrop.css";
import "pdfjs-dist/build/pdf.worker.js";
import Epaper from "./Newpage";
import axios from "axios";

function OnePage(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [Data, setData] = useState([]);
  const location = useLocation();

  const [image, setImage] = useState();
  const [selectedimage, setSelectedImage] = useState();
  const [imagedata, setImageData] = useState<any>([]);
  const [Isloading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const { id }: any = useParams();

  let newsid = location?.state?.id;
  let data = location?.state?.item?.attributes?.epapercollections;

  const pdfUrl = image && image;

  useEffect(() => {
    if (pdfUrl) {
      const PDFJS = require("pdfjs-dist/build/pdf");
      PDFJS.GlobalWorkerOptions.workerSrc = "pdf.worker.js"; // Adjust the path as needed

      const loadingTask = PDFJS.getDocument(pdfUrl);

      loadingTask.promise
        .then((pdf: any) => {
          const totalPages = pdf.numPages;
          const pageData: any[] = [];

          const loadPage = async (pageNumber: any) => {
            const page = await pdf.getPage(pageNumber);
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");

            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = { canvasContext: context, viewport };

            const renderTask = page.render(renderContext);
            await renderTask.promise;

            pageData.push(canvas.toDataURL("image/png", 1.0));

            if (pageNumber === totalPages) {
              setImageData(pageData);
              console.log(pageData.length + " page(s) loaded in data");
            } else {
              loadPage(pageNumber + 1);
            }
          };

          loadPage(1);
        })
        .catch((reason: any) => {
          console.error(reason);
        });
    }
    loadData(id);
  }, [image]);

  const loadData = async (id: any) => {
    setIsLoading(true);
    let url = `https://ec2.suprabhaathamapi.com/api/e-papers/${id}`;
    axios
      .get(url)
      .then((response) => {
        setData(response?.data?.data?.attributes?.epapercollections);
        // setImage(response?.data?.data?.attributes?.epapercollections[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  function CropDemo() {
    const [crop, setCrop] = useState<Crop>();
    const [croppedImageUrl, setCroppedImageUrl] = useState<Blob | null>(null);

    const cropperRef = useRef<HTMLImageElement>(null);

    const handleCropComplete = (crop: Crop) => {
      makeClientCrop(crop);
    };

    const makeClientCrop = async (crop: Crop) => {
      if (cropperRef.current && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(
          cropperRef.current,
          crop,
          "newFile.pdf",
          1.0
        );
        setCroppedImageUrl(croppedImageUrl);

        const imageUrl = URL.createObjectURL(croppedImageUrl);

        openNewTab(imageUrl);
      }
    };

    const getCroppedImg = (
      image: HTMLImageElement,
      crop: Crop,
      fileName: string,
      quality: number
    ) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Increase the scaling factor for better clarity
      const scaleFactor = 10; // You can adjust this value based on your requirements

      canvas.width = crop.width! * scaleFactor;
      canvas.height = crop.height! * scaleFactor;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        image,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width! * scaleFactor,
        crop.height! * scaleFactor
      );

      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      // // var blob = new Blob([], { type: "image/jpeg" });
      // // console.log("========blob===========", blob);
      // const blob =canvas.toBlob(
      //   (blob) => {
      //     console.log("=========blob========", blob);
      //   },
      //   "image/jpeg",
      //   quality
      // );

      // // console.log("==========dataUrl===========", dataUrl);
      // const imageUrl = URL.createObjectURL(blob);
      const blob = dataURLtoBlob(dataUrl);
      return blob;
    };

    const dataURLtoBlob = (dataURL: string) => {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], { type: mime });
    };
    return (
      <>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={handleCropComplete}
        >
          {imagedata[0] ? (
            <img ref={cropperRef} alt="Epaper" src={imagedata[0]} />
          ) : (
            <Skeleton active />
          )}
        </ReactCrop>
      </>
    );
  }

  const handleClick = (item: any) => {
    setImage(item);
    window.scroll(0, 0);
    console.log("===========image======", image);
  };
  const openNewTab = (item: any) => {
    localStorage.setItem("cropedData", JSON.stringify(item));
    const url = `/Newpage/${id}`;

    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.document.addEventListener("DOMContentLoaded", () => {
        const rootElement = newTab.document.createElement("div");
        newTab.document.body.appendChild(rootElement);

        ReactDOM.render(<Epaper />, rootElement);
      });
    }
  };

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  return (
    <>
      <Header />
      {Isloading ? (
        <Skeleton active />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Row
              style={{
                width: "80%",
                justifyContent: "center",
                padding: "20px",
                marginTop: "50px",
                marginBottom: "50px",
                border: "solid 3px #d3d3d3",
                borderRadius: "10px",
              }}
            >
              <Col lg={20}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "20px",
                  }}
                ></div>
                <CropDemo />
              </Col>
              {Data?.length &&
                Data?.map((item: any, index: any) => {
                  return (
                    <Col
                      lg={7}
                      key={index}
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        border: "solid 2px #D3D3D3",
                        marginLeft: "10px",
                        borderRadius: "10px",
                        padding: "8px",
                      }}
                      // onClick={(event) => {
                      //   event.preventDefault(); // Prevent the default behavior
                      //   handleClick(item);
                      // }}
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
                    </Col>
                  );
                })}
            </Row>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
export default OnePage;
