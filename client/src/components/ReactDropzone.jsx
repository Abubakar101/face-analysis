import React, { Component } from "react";
import Dropzone from "react-dropzone";

class ReactDropzone extends Component {
  render() {
    return (
      <Dropzone
      id="reactDropZone"
        multiple={false}
        accept="image/*"
        onDrop={this.props.onImageDrop}
      >
        {this.props.imgUrl.length > 0 ? (
          <img src={this.props.imgUrl} id="personImg" alt="" />
        ) : (
          <img src={"/images/littleboy.jpg"} id="blankImg" alt="" />
        )}
      </Dropzone>
    );
  }
}

export default ReactDropzone;
