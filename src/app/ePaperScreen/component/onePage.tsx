import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import ReactCrop, { Crop } from "react-image-crop";
import { Document, Page, pdfjs } from "react-pdf";
import "react-image-crop/dist/ReactCrop.css";
import "pdfjs-dist/build/pdf.worker.js";


function OnePage(props: any) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const blobUrlRef = useRef("");
  const [image, setImage] = useState(location?.state?.data);
  const [imagedata, setImageData] = useState<any>([]);
 
  const cropperRef = useRef(null);

  let data = location?.state?.news;
  const ref = useRef<any>();
  const scroll = (ratio: number) => {
    ref.current.scrollTop += ratio;
  };
  const pdfUrl = image
  useEffect(() => {
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

          pageData.push(canvas.toDataURL("image/png",1.0));

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
  }, [image]);
  
  function CropDemo() {
    const [crop, setCrop] = useState<Crop>();
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

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

        openWindow(croppedImageUrl);
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
      canvas.width = crop.width! * 3;
      canvas.height = crop.height! * 3;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        image,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width! * 3,
        crop.height! * 3
      );

      // return new Promise<string>((resolve, reject) => {
      //   canvas.toBlob((blob) => {
      //     if (!blob) {
      //       reject(new Error("Canvas is empty"));
      //       return;
      //     }
      //     const url = URL.createObjectURL(blob);
      //     resolve(url);
      //   }, "image/png");
      // });
      const dataUrl = canvas.toDataURL("image/png", quality);
      return dataUrl
    };

    return (
      <>
       <ReactCrop crop={crop} onChange={(c) => setCrop(c)}
       onComplete={handleCropComplete}
    
       >
          <img 
          ref={cropperRef}
          alt="Crop"
          src={imagedata[0]} />
        </ReactCrop>
      </>
    );
  }

  const handleClick = (item: any) => {
    setImage(item);
    window.scroll(0,0)
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
                    width: 80%;
                    height:80%;
        
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
            <img class="imgSrc" src="${item}" alt="Image">
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
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  return (
    <>
      <Header />
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
          {data?.length &&
            data?.map((item: any) => {
              return (
                <Col
                  lg={7}
                  key={item.id}
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    border: "solid 2px #D3D3D3",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    padding: "8px",
                  }}
                  onClick={() => handleClick(item)}
                >
                  <Document file={item} onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={300}
                      height={500}
                      renderAnnotationLayer={false}
                      
                    />
                  </Document>
                </Col>
              );
            })}
        </Row>
      </div>
      <Footer />
    </>
  );
}
export default OnePage;
