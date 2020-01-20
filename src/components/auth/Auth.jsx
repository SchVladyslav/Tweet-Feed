<<<<<<< HEAD
<<<<<<< HEAD
// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";

// const { Provider, Consumer: AuthConsumer } = React.createContext({
//   isAuthorized: false
// });

// class Auth extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isAuthorized: false
//     };
//   }

//   authorize = () => {
//     this.setState({ isAuthorized: true }, () => {
//       this.props.history.push("/dashboard");
//     });
//   };

//   render() {
//     const { isAuthorized } = this.state;

//     return (
//       <Provider value={{ isAuthorized, authorize: this.authorize }}>
//         {this.props.children}
//       </Provider>
//     );
//   }
// }

// export default withRouter(Auth);
=======
import React from "react";

export const Auth = () => {
  return <div></div>;
};
>>>>>>> common elements added
=======
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const { Provider, Consumer: AuthConsumer } = React.createContext({
  isAuthorized: false
});

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false
    };
  }

  authorize = () => {
    this.setState({ isAuthorized: true }, () => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const { isAuthorized } = this.state;

    return (
      <Provider value={{ isAuthorized, authorize: this.authorize }}>
        {this.props.children}
      </Provider>
    );
  }
}

export default withRouter(Auth);
>>>>>>> Authorization added
