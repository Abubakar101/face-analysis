import React, { Component } from "react";
import { Button } from "react-materialize";

class ImageLinkForm extends Component {
  render() {
    return (
      <form
        id="imageLink"
        onSubmit={e => {
          e.preventDefault();

          this.props.callFacePlusAPI(e.target.userInput.value, "link");
          e.target.userInput.value = "";
        }}
      >
        <div id="imageInputFormContainer">
          <input
            id="imageLinkInput"
            name="userInput"
            type="url"
            placeholder="Image link here"
          />
          <span id="imageUpload" className="Qwigley">
            OR
          </span>
          <a id="uploadImageBtn" className="btn-floating" onClick={this.props.toggleCameraState}>
            <i className="material-icons">add_a_photo</i>
          </a>
        </div>
        <Button waves="light" className="inputBtn" type="submit" value="submit">
          Submit
        </Button>
      </form>
    );
  }
}
export default ImageLinkForm;
