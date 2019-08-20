import React, { Component } from "react";
import Dropzone from "react-dropzone";

class ReactDropzone extends Component {
  state = {
    defultImage: "/images/littleboy.jpg"
  };

  showDefaultImage = () => {
    return this.props.imgUrl.length > 0 ? (
      <img src={this.props.imgUrl} id="personImg" alt="" />
    ) : (
      <img src={this.state.defultImage} id="blankImg" alt="" />
    );
  };

  render() {
    return (
      <Dropzone
        id="reactDropZone"
        multiple={false}
        accept="image/*"
        onDrop={e => this.props.callFacePlusAPI(e[0], "file")}
      >
        {this.showDefaultImage()}
      </Dropzone>
    );
  }
}

export default ReactDropzone;
