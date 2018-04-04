import React, { Component } from "react";
import { Button } from "react-materialize";
class Nav extends Component {
  state = {};

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="black">
          <div className="nav-wrapper">

          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;

// <ul className="right hide-on-med-and-down">
// <li>
//   <Button
//     onClick={this.props.toggleResults}
//     className="left light"
//   >
//     {this.state.toggleResults ? "Show Results" : "Saved Results"}
//   </Button>
// </li>
// </ul>