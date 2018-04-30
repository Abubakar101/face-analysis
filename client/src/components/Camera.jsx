import React, { Component } from "react";
class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const constraints = {
      audio: false,
      video: {
        width: { ideal: 426 },
        height: { ideal: 426}
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
  };

  handleError(error) {
    console.log("navigator.getUserMedia error: ", error);
  }

  render() {
    return <video id="video" autoPlay />;
  }
}

export default Camera;
