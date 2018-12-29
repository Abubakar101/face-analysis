import React, { Component } from "react";
import takePhoto from "./camera/takePhoto";
import stream from "./camera/stream";

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

  renderCameraBtns = () => {
    return (
      <ul id="cameraBtns">
        <li>
          <a
            id="uploadImageBtn"
            className="btn-floating btn-large"
            onClick={this.callOnImageDrop}
          >
            <i className="material-icons">add_a_photo</i>
          </a>
        </li>
        <li>
          <a
            id="uploadImageBtn"
            className="btn-floating"
            onClick={e => {
              this.props.toggleCameraState();
              stream.stop();
            }}
          >
            <i className="material-icons">backspace</i>
          </a>
        </li>
      </ul>
    );
  };

  render() {
    return (
      <React.Fragment>
        <video id={this.state.id} />
        {this.renderCameraBtns()}
      </React.Fragment>
    );
  }
}

export default Camera;
