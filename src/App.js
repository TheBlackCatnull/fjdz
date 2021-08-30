import React from "react";
import App3 from "./App3";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { palye: true };
  }
  Onclick() {
    this.setState({ palye: false });
    setTimeout(() => {
      this.setState({ palye: true });
    });
  }

  render() {
    console.log(this.state.palye);
    return this.state.palye && <App3 palye={this.Onclick.bind(this)} />;
  }
}
export default App;
