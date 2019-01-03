import React, { Component } from "react";
import takePhoto from "./camera/takePhoto";
import stream from "./camera/stream";
import Buttons from "./camera/buttons";

class Camera extends Component {
  state = {
    id: "video"
  };

  componentDidMount() {
    stream.start(this.state.id);
  }

  getImageB64 = () => {
    const canvasUrl = takePhoto();
    this.props.callFacePlusAPI(canvasUrl, "base");
  };

  render() {
    return (
      <React.Fragment>
        <video id={this.state.id} />
        {
          <Buttons
            getImageB64={this.getImageB64}
            toggleCameraState={this.props.toggleCameraState}
            stream={stream}
          />
        }
      </React.Fragment>
    );
  }
}

export default Camera;
