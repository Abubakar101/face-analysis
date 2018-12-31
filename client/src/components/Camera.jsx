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

  callOnImageDrop = () => {
    const canvasUrl = takePhoto();
    this.props.onImageDrop([canvasUrl]);
  };

  render() {
    return (
      <React.Fragment>
        <video id={this.state.id} />
        {
          <Buttons
            callOnImageDrop={this.callOnImageDrop}
            toggleCameraState={this.props.toggleCameraState}
            stream={stream}
          />
        }
      </React.Fragment>
    );
  }
}

export default Camera;
