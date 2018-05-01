import React, { Component } from "react";
import { Button } from "react-materialize";

class ImageUploadForm extends Component {
  render() {
    return (
      <form
        id="imageUpload"
        onSubmit={e => {
          e.preventDefault();

          this.props.saveImgLink(e.target.userInput.value);
          e.target.userInput.value = "";
        }}
      >
      <a id="uploadImageBtn" className="btn-floating btn-large" onClick={this.props.toggleCameraState}>
      <i className="material-icons">add_a_photo</i>
    </a>
      </form>
    );
  }
}
export default ImageUploadForm;
