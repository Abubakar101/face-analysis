import React, { Component } from "react";
import takePhoto from './camera/takePhoto'

class Camera extends Component {
  componentDidMount() {
    const constraints = {
      audio: false,
      video: {
        width: { ideal: 400 },
        height: { ideal: 400 }
      }
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  handleSuccess = stream => {
    const video = document.querySelector("#video");
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
    video.play();
  };

  handleError = error => {
    console.log("navigator.getUserMedia error: ", error);
  };

  callOnImageDrop = () => {
   const canvasUrl = takePhoto();
   this.props.onImageDrop([canvasUrl]);
  }

  stopStream = () => window.stream.getTracks().forEach(track => track.stop());

  render() {
    return (
      <React.Fragment>
        <video id="video" />
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
                this.stopStream();
              }}
            >
              <i className="material-icons">backspace</i>
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Camera;
