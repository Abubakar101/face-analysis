import React, { Component } from "react";
import { Button } from "react-materialize";

class InputForm extends Component {
  render() {
    return (
      <form
        id="imageLink"
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
export default InputForm;
