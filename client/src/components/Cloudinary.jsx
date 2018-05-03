import React, { Component } from "react";
import ReactDropzone from "./ReactDropzone";
import Camera from "./Camera";
import request from "superagent";

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
    console.log(files);
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
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
