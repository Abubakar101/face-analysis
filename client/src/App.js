import React, { Component } from "react";
// import { BrowserRouter as Switch } from "react-router-dom";
// import { Button, Col, Row, Card } from "react-materialize";
import "./App.css";
import axios from "axios";

import Nav from "./components/Nav";
import Results from "./components/Results";
import InputForm from "./components/InputForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIData: [],
      savedData: [],
      imgUrl: "",
      showResults: false
    };
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
      let sortedAPIData = response.data.faces.sort((a,b) => a.face_rectangle.left - b.face_rectangle.left);
      let faceAttr = sortedAPIData.map(e => e.attributes);
      console.log(response.data)
      this.setState({
        APIData: faceAttr,
        showResults: true
      });

      console.log(this.state.APIData);

    } catch (error) {
      console.log(error);
    }
  };

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
  //     await axios.post("/", addData).then(res => {
  //       this.setState({ savedData: [...this.state.savedData, res.data] });
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
  //   let id = delItem.id;
  //   console.log(delItem);
  //   try {
  //     await axios.delete(`/${id}`).then(res => {
  //       if (res.data === "OK") {
  //         this.setState({
  //           savedData: this.state.savedData.filter(e => e.id !== id)
  //         });
  //       }
  //       console.log(res);
  //       console.log("DELETE Request SENT");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    // debugger;
    // console.log(this.state.APIData);

    return (
      <div className="app">
        <Nav toggleResults={this.toggleResults} />


        {this.state.imgUrl.length > 0 ? (
          <img src={this.state.imgUrl} id="personImg" alt="" />
        ) : (
          <img src={"/images/littleboy.jpg"} id="blankImg" alt="" />
        )}
        <InputForm saveImgLink={this.saveImgLink} />

        {this.state.showResults ? (
          <Results
            APIData={this.state.APIData}
            showResults={this.state.showResults}
          />
        ) : (
          ""
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
