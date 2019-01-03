import React, { Component } from "react";
import { Col, Row } from "react-materialize";
import "./App.css";
import axios from "axios";

import Nav from "./components/Nav";
import Results from "./components/Results";
import SavedResults from "./components/SavedResults";
import ImageLinkForm from "./components/ImageLinkForm";
import Cloudinary from "./components/Cloudinary";
import facePlusAPI from "./components/facePlusAPI";

import ReactDropzone from "./components/ReactDropzone";
import Camera from "./components/Camera";

// <Cloudinary
// saveImgLink={this.saveImgLink}
// imgUrl={this.state.imgUrl}
// toggleCameraState={this.toggleCameraState}
// showCamera={this.state.showCamera}
// onImageDrop={this.onImageDrop}
// />

class App extends Component {
  state = {
    APIData: [],
    savedData: [],
    imgUrl: "",
    showResults: false,
    showSavedResults: false,
    showCamera: false
  };

  async componentDidMount() {
    // Get all saved data from DB
    this.getDBInfo();
  }

  // Getting data from  database
  getDBInfo = async () => {
    try {
      await axios.get("/datas").then(res => {
        const parsed = res.data.map(e => {
          return {
            id: e.id,
            faces: JSON.parse(e.face),
            image: e.image,
            favorite: e.favorite
          };
        });

        this.setState({ savedData: parsed });
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*******************************************************
    Calling Face++ API
   *******************************************************/
  callFacePlusAPI = async (img, method) => {
    let response, imgUrl;

    if (method === "file") {
      response = await facePlusAPI.sendImageFile(img[0]);
      imgUrl = img[0].preview;
    } else if (method === "link") {
      response = await facePlusAPI.sendImageLink(img);
      imgUrl = img;
    } else if (method === "base") {
      response = await facePlusAPI.sendImageB64(img);
    }

    this.saveAPIData(response, imgUrl);
  };

  // ******************************************************
  // Saving Images analysis from API
  saveAPIData = async (response, imgUrl) => {
    // Sorting the faces from left to right.
    const sortedAPIData = response.sort(
      (a, b) => a.face_rectangle.left - b.face_rectangle.left
    );
    this.setState({
      APIData: sortedAPIData,
      showResults: true,
      imgUrl
    });
  };

  // Adding saved data into Database - both information and image
  addInfo = async (faces, image) => {
    let face = JSON.stringify(faces);
    let data = { face, image, favorite: false };

    try {
      await axios.post("/datas", data).then(res => {
        let parsed = {
          id: res.data.id,
          faces: JSON.parse(res.data.face),
          image: res.data.image,
          favorite: res.data.favorite
        };
        this.setState({ savedData: [...this.state.savedData, parsed] });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting the saved data from Database
  delInfo = async id => {
    try {
      for (let index of id) {
        let response = await axios.delete(`/datas/${index}`);

        if (response.data === "OK") {
          this.setState({
            savedData: this.state.savedData.filter(e => e.id !== index)
          });
        }
        // reloading the window when there's no more saved data
        if (!this.state.savedData[0]) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Saving to favorites
  updateFav = async (id, fav) => {
    let isFavorite = !fav;
    try {
      await axios.patch(`/datas/${id}`, { favorite: isFavorite }).then(e => {
        // Calling get request from database with updated information
        this.getDBInfo();
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Toggling the views between "API results" and "Saved Data Results"
  toggleResults = () => {
    this.setState({ showSavedResults: !this.state.showSavedResults });
  };

  // Toggling the Camera state to show camera
  toggleCameraState = () => {
    this.setState({ showCamera: !this.state.showCamera });
  };

  showResultsToggle = () => {
    return (
      <Row className="btnRow">
        <Col className="offset-s12">
          {this.state.showSavedResults ? (
            <a className="btn-floating btn-large waves-effect waves-light green ">
              <i
                className="material-icons"
                onClick={() => this.toggleResults()}
              >
                search
              </i>
            </a>
          ) : (
            <a className="btn-floating btn-large waves-effect waves-light green ">
              <i
                className="material-icons"
                onClick={() => this.toggleResults()}
              >
                collections_bookmark
              </i>
            </a>
          )}
        </Col>
      </Row>
    );
  };

  renderComponents = () => {
    if (this.state.showCamera) {
      return (
        <Camera
          toggleCameraState={this.toggleCameraState}
          callFacePlusAPI={this.callFacePlusAPI}
        />
      );
    } else if (!this.state.showCamera) {
      return (
        <React.Fragment>
          <div id="reactDragDropTitle" className="Qwigley">
            <p>Drop an image or click</p>
            <p>to select a file to upload!</p>
            <div id="curvedarrow" />
          </div>
          <ReactDropzone
            callFacePlusAPI={this.callFacePlusAPI}
            imgUrl={this.state.imgUrl}
          />
          <ImageLinkForm
            callFacePlusAPI={this.callFacePlusAPI}
            toggleCameraState={this.toggleCameraState}
          />
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="app">
        <Nav />

        {(this.state.showCamera && (
          <Camera
            toggleCameraState={this.toggleCameraState}
            callFacePlusAPI={this.callFacePlusAPI}
          />
        )) || (
          <React.Fragment>
            <div id="reactDragDropTitle" className="Qwigley">
              <p>Drop an image or click</p>
              <p>to select a file to upload!</p>
              <div id="curvedarrow" />
            </div>
            <ReactDropzone
              callFacePlusAPI={this.callFacePlusAPI}
              imgUrl={this.state.imgUrl}
            />
            <ImageLinkForm
              callFacePlusAPI={this.callFacePlusAPI}
              toggleCameraState={this.toggleCameraState}
            />
          </React.Fragment>
        )}

        {this.state.savedData[0] ? this.showResultsToggle() : ""}

        {(!this.state.showSavedResults &&
          (this.state.showResults && (
            <Results
              APIData={this.state.APIData}
              imgUrl={this.state.imgUrl}
              addInfo={this.addInfo}
            />
          ))) || (
          <SavedResults
            resultsData={this.state.savedData}
            delInfo={this.delInfo}
            isFavorite={this.state.isFavorite}
            updateFav={this.updateFav}
          />
        )}
      </div>
    );
  }
}

export default App;
