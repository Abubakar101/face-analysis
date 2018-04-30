import React, { Component } from "react";
import { Button } from "react-materialize";

class ImageUploadForm extends Component {
  render() {
    return (
      <form
        id="imageUpload"
        onSubmit={e => {
          e.preventDefault();

          this.props.saveImgLink(e.target.userInput.value);
          e.target.userInput.value = "";
        }}
      >
        <input
          name="userInput"
          type="url"
          placeholder="Image link here"
        />

        <Button waves='light' className="inputBtn" type="submit" value="submit">
          Submit
        </Button>
      </form>
    );
  }
}
export default ImageUploadForm;
