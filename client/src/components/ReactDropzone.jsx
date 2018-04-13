import React, { Component } from "react";
import Dropzone from "react-dropzone";

class ReactDropzone extends Component {
  render() {
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.props.onImageDrop}
      >
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
    );
  }
}

export default ReactDropzone;
