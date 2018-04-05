import React, { Component } from "react";
// import { BrowserRouter as Switch } from "react-router-dom";
import { Button, Col, Row, Card } from "react-materialize";
import "./App.css";
import axios from "axios";

import Nav from "./components/Nav";
import Results from "./components/Results";
import SavedResults from "./components/SavedResults";
import InputForm from "./components/InputForm";

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
    try {
      await axios.get("/datas").then(res => {
        // let ascendingOrder = e.data.sort((a, b) => a.position - b.position)
        const parsed = res.data.map(e=> {
          return {
            id: e.id,
            faces: JSON.parse(e.face),
            image: e.image,
            favorite: e.favorite
          };
          
        })

        this.setState({ savedData: parsed });
        // console.log(this.state.savedData);
      });
    } catch (error) {
      console.log(error);
    }
  }

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
    let data = { face, image };

    try {
      await axios.post("/", data).then(res => {
        let parsed = {
          id: res.data.id,
          faces: JSON.parse(res.data.face),
          image: res.data.image,
          favorite: res.data.favorite
        };
        this.setState({ savedData: [...this.state.savedData, parsed] });
        console.log("backend saved Data", this.state.savedData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting the saved data from Database
  delInfo = async id => {
    try {
      await axios.delete(`/${id}`).then(res => {
        if (res.data === "OK") {
          this.setState({
            savedData: this.state.savedData.filter(e => e.id !== id)
          });
        }
        // console.log(res);
        console.log("DELETE Request SENT");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Saving to favorites

  updateFav = () => {};

  // Search API with user input
  // callAPI = (userInput, agency_name, limit) => {
  //   let URL = `https://data.cityofnewyork.us/resource/buex-bi6w.json?$select=additional_description_1 as description,agency_name as agencyName,section_name as sectionName,short_title as shortTitle`;
  //   agency_name && (URL += `&agency_name=${agency_name}`);
  //   URL += `&$q=${userInput}`;
  //   limit && (URL += `&$limit=${limit}`);
  //   try {
  //     axios.get(URL).then(e => {
  //       this.setState({ data: e.data });

  //       console.log(e.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log(userInput, agency_name, limit);
  // };

  // toggleResults = e => {
  //   this.setState({ shouldShowSaveResults: !this.state.shouldShowSaveResults });
  //   // console.log("eorking")
  // };

  // Save to DB
  // saveItem = async addData => {
  //   try {
  // await axios.post("/", addData).then(res => {
  //   this.setState({ savedData: [...this.state.savedData, res.data] });
  //       // console.log(this.state.savedData);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // console.log(addData);
  // };

  // reOrderList = async itemsId => {
  //   try {
  //     for (let i = 0, j = itemsId.length; i < j; i++) {
  //       await axios.patch(`/${itemsId[i]}`, { position: i + 1 }).then(e => {
  //         console.log("Position Updated");
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // delItem = async delItem => {
  // let id = delItem.id;
  // console.log(delItem);
  // try {
  //   await axios.delete(`/${id}`).then(res => {
  //     if (res.data === "OK") {
  //       this.setState({
  //         savedData: this.state.savedData.filter(e => e.id !== id)
  //       });
  //     }
  //     console.log(res);
  //     console.log("DELETE Request SENT");
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  // Toggling the views between "API results" and "Saved Data Results"
  toggleResults = () => {
    this.setState({ showSavedResults: !this.state.showSavedResults });
  };

  showResultsToggle = () => {
    return (
      <Row className="btnRow">
        <Col className="s12 offset-s12">
          {this.state.showSavedResults ? (
            <a className="btn-floating btn-large waves-effect waves-light red ">
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
    // console.log(this.state.APIData)
    // console.log(...this.state.savedData)
    return (
      <div className="app">
        <Nav />

        {this.state.imgUrl.length > 0 ? (
          <img src={this.state.imgUrl} id="personImg" alt="" />
        ) : (
          <img src={"/images/littleboy.jpg"} id="blankImg" alt="" />
        )}
        <InputForm saveImgLink={this.saveImgLink} />

        {this.state.savedData[0] ? this.showResultsToggle() : ""}


        {  !this.state.showSavedResults ? (
          this.state.showResults ?
            (<Results
              APIData={this.state.APIData}
              imgUrl={this.state.imgUrl}
              addInfo={this.addInfo}
            />) : ""
          ) : (
            <SavedResults
              resultsData={this.state.savedData}
              delInfo={this.delInfo}
              showSavedResults={this.state.showSavedResults}
            />
          )}
     
      </div>
    );
  }
}

export default App;

// <InputForm
// callAPI={this.callAPI}
// columnAgency_name={this.state.columnAgency_name}
// />

// <Results
// reOrderList={this.reOrderList}
// data={this.state.data}
// toggleResults={this.toggleResults}
// shouldShowSaveResults={this.state.shouldShowSaveResults}
// savedData={this.state.savedData}
// saveItem={this.saveItem}
// delItem={this.delItem}
// />
