import React, { Component } from "react";
import Dropzone from "react-dropzone";

class ReactDropzone extends Component {
  render() {
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.props.onImageDrop}
        
      />
    );
  }
}

export default ReactDropzone;
