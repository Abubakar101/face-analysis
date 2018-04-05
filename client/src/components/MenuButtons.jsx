import React, { Component } from "react";
import { Button, Col, Row, Card } from "react-materialize";

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (

        <Col className="s12 offset-s12">

          {this.props.showSavedResults ? (
            <a className="btn-floating btn-large waves-effect waves-light red ">
              <i className="material-icons" onClick={() => this.props.delInfo()}>
                delete_forever
              </i>
            </a>
          ) : (
            <a className="btn-floating btn-large waves-effect waves-light green ">
              <i
                className="material-icons"
                onClick={() =>
                  this.props.addInfo(this.props.resultsData, this.props.imgUrl)
                }
              >
                add
              </i>
            </a>
          )}


        </Col>

    );
  }
}

export default MenuButton;
