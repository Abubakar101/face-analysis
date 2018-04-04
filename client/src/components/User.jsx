import React, { Component } from "react";
class User extends Component {
  render() {
    return (
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={e => this.props.isUserLogin(true)}>
            <div className="card-content">
              <span className="card-title">User Login</span>

              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="validate"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    className="validate"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
            </div>

            <div className="card-action right-align">
              <input
                type="reset"
                id="reset"
                className="btn-flat grey-text waves-effect"
              />
              <input
                type="submit"
                className="btn green waves-effect waves-light"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default User;
