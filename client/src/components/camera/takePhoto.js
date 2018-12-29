const takePhoto = () => {
    let canvas, context;
    
    const video = document.querySelector("video");
    const [width, height] = [video.offsetWidth, video.offsetHeight];

    canvas = canvas || document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    return canvas.toDataURL("image/png");
  };

export default takePhoto;