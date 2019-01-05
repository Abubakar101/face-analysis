import React, { Component } from "react";
import drawCanvas from "./camera/canvas";
import stream from "./camera/stream";
import Buttons from "./camera/buttons";

class Camera extends Component {
  state = {
    id: "video"
  };

  componentDidMount() {
    stream.start(this.state.id);
  }

  takePhoto = async () => {
    const file = await drawCanvas();
    this.props.callFacePlusAPI(file, "file");
  };

  render() {
    return (
      <React.Fragment>
        <video id={this.state.id} />
        {
          <Buttons
            takePhoto={this.takePhoto}
            toggleCameraState={this.props.toggleCameraState}
            stream={stream}
          />
        }
      </React.Fragment>
    );
  }
}

export default Camera;
