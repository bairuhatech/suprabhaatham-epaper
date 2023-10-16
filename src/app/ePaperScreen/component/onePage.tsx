import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../component/header";
import Footer from "../../../component/footer/footer";
import { Button, Col, Row } from "antd";
import "cropperjs/dist/cropper.css";
import { useNavigate } from "react-router-dom";
import ReactCrop, { Crop,} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";


function OnePage(props: any) {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
  const location = useLocation();
  const navigate = useNavigate();
  const blobUrlRef = useRef('')
  const [image, setImage] = useState(location?.state?.data?.url);
  const cropperRef = useRef(null);
//   const [croppedImage, setCroppedImage] = useState<any>(null);
//   const [croppedImageURL, setCroppedImageURL] = useState("");
//   const aspectRatio = 1;
//   const [canvass, setCanvas] = useState<any>(null);

  let data = location?.state?.news;
  const ref = useRef<any>();
  const scroll = (ratio: number) => {
    ref.current.scrollTop += ratio;
  };

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
          'newFile.png'
        );
        setCroppedImageUrl(croppedImageUrl)
        openWindow(croppedImageUrl);
      }
    };
    const getCroppedImg = (image: HTMLImageElement, crop: Crop, fileName: string) => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width!;
      canvas.height = crop.height!;
  
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        image,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );
  
      return new Promise<string>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          const url = URL.createObjectURL(blob);
          resolve(url);
        }, 'image/png');
      });
    };
  
    return (
      <div>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => handleCropComplete(c)}
          >
         <img
          ref={cropperRef}
          alt="Crop"
          src={image}
          crossOrigin="anonymous"
        />
        </ReactCrop>
        {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
      </div>
    );
  }


  

  

  const handleClick = (item: any) => {
    setImage(item.url);
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
            >
           
            </div>
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
                >
                  <img
                    style={{ width: "100%" }}
                    src={item?.url}
                    alt=""
                    onClick={() => handleClick(item)}
                  />
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
