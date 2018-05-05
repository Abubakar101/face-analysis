import React, { Component } from "react";
import request from "superagent";

import ReactDropzone from "./ReactDropzone";
import Camera from "./Camera";

const CLOUDINARY_UPLOAD_PRESET = "vizmpuyp";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/digimonkey/upload";

class Cloudinary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ""
    };
  }

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      var data = canvas.toDataURL("image/jpeg");
      this.props.saveImgLink(data);
    };
    img.src = files[0].preview;

    // console.log(img)

    // debugger;
    // this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file)
      .end((err, response) => {
        if (err) {
          console.error(err);
        }

        if (response.body.secure_url !== "") {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
          });
          this.props.saveImgLink(this.state.uploadedFileCloudinaryUrl);
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.showCamera ? (
          <Camera
            toggleCameraState={this.props.toggleCameraState}
            onImageDrop={this.onImageDrop}
          />
        ) : (
          <ReactDropzone
            onImageDrop={this.onImageDrop}
            imgUrl={this.props.imgUrl}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Cloudinary;
