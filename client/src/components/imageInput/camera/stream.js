const constraints = {
  audio: false,
  video: {
    width: { ideal: 400 },
    height: { ideal: 400 }
  }
};

const handleSuccess = (stream, tagID) => {
  const video = document.querySelector(tagID);
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
  video.play();
};

const handleError = error => {
  console.log("navigator.getUserMedia error: ", error);
};

const stream = {
  start: tagID => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => handleSuccess(stream, tagID))
      .catch(handleError);
  },
  stop: () => window.stream.getTracks().forEach(track => track.stop())
};

export default stream;
