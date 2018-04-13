import React, { Component } from "react";
import { Col, Row } from "react-materialize";
import "./App.css";
import axios from "axios";

import Nav from "./components/Nav";
import Results from "./components/Results";
import SavedResults from "./components/SavedResults";
import InputForm from "./components/InputForm";
import Cloudinary from "./components/Cloudinary";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIData: [],
      savedData: [],
      imgUrl: "",
      showResults: false,
      showSavedResults: false
    };
  }

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

  // User Input of Image URL
  saveImgLink = async imgUrl => {
    await this.setState({ imgUrl });
    this.callAPI();
  };

  // POSTing Image to API to fetch the Image's analysis
  callAPI = async () => {
    const url = `https://api-us.faceplusplus.com/facepp/v3/detect`,
      api_key = `Bf1XAtfGUPU8m6zqcmWGyBZ9yqhuBRNF`,
      api_secret = `Sge5iA6CQ6gOhlY3LpcAO1tUFM6mF_x7`,
      image_url = this.state.imgUrl,
      return_attributes = `gender,age,emotion,ethnicity,beauty`;

    try {
      const response = await axios.post(
        `${url}?api_key=${api_key}&api_secret=${api_secret}&image_url=${image_url}&return_attributes=${return_attributes}`
      );

      // Sorting the faces from left to right.
      let sortedAPIData = response.data.faces.sort(
        (a, b) => a.face_rectangle.left - b.face_rectangle.left
      );
      this.setState({
        APIData: sortedAPIData,
        showResults: true
      });
    } catch (error) {
      console.log(error);
    }
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

  render() {
    return (
      <div className="app">
        <Nav />
        <div id="reactDragDropContainer">
          <div id="reactDragDropTitle">
            <p>Drop an image or click</p>
            <p>to select a file to upload!</p>
            <div id="curvedarrow"></div>
          </div>
          <Cloudinary
            saveImgLink={this.saveImgLink}
            imgUrl={this.state.imgUrl}
          />
        </div>
        <InputForm saveImgLink={this.saveImgLink} />

        {this.state.savedData[0] ? this.showResultsToggle() : ""}

        {!this.state.showSavedResults ? (
          this.state.showResults ? (
            <Results
              APIData={this.state.APIData}
              imgUrl={this.state.imgUrl}
              addInfo={this.addInfo}
            />
          ) : (
            ""
          )
        ) : (
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
