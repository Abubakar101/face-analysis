import React from "react";

const Buttons = props => {
  return (
    <ul id="cameraBtns">
      <li>
        <a
          id="uploadImageBtn"
          className="btn-floating btn-large"
          onClick={props.takePhoto}
        >
          <i className="material-icons">add_a_photo</i>
        </a>
      </li>
      <li>
        <a
          id="uploadImageBtn"
          className="btn-floating"
          onClick={e => {
            props.toggleCameraState();
            props.stream.stop();
          }}
        >
          <i className="material-icons">backspace</i>
        </a>
      </li>
    </ul>
  );
};

export default Buttons;
