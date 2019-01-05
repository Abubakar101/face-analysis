const canvasToBlob = canvas => {
  return new Promise(function(res, rej) {
    canvas.toBlob(blob => {
      blob.preview = URL.createObjectURL(blob);
      res(blob);
    });
  });
};

const drawCanvas = () => {
  const canvas = document.createElement("canvas");
  const video = document.querySelector("video");
  const [width, height] = [video.offsetWidth, video.offsetHeight];

  canvas.width = width;
  canvas.height = height;

  canvas.getContext("2d").drawImage(video, 0, 0, width, height);
  return canvasToBlob(canvas);
};

export default drawCanvas;
