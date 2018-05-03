import React, { Component } from "react";

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

  takePhoto = () => {
    const video = document.querySelector("video");
    let canvas, context;
    const width = video.offsetWidth,
      height = video.offsetHeight;

    canvas = canvas || document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    var URL = canvas.toDataURL("image/png");
    this.props.onImageDrop([URL]);
  };

  render() {
    return (
      <React.Fragment>
        <video id="video" />
        <ul id="cameraBtns">
          <li>
            <a
              id="uploadImageBtn"
              className="btn-floating btn-large"
              onClick={this.takePhoto}
            >
              <i className="material-icons">add_a_photo</i>
            </a>
          </li>
          <li>
            <a
              id="uploadImageBtn"
              className="btn-floating"
              onClick={this.props.toggleCameraState}
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
