import React from "react";
import { render } from "react-dom";
import SourceData from "./SourceData.json";

export class App extends React.Component {
  state = {
    value: "",
    sourceData: SourceData,
    filterData: []
  };

  handleClick= e => {
    this.setState({
      filterData: this.state.sourceData
    });
  };

  filterList = e => {
    const updatedList = this.state.sourceData.filter(item => {
      return (
        item.continent.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ filterData: updatedList });
  };

  render() {
    const searchBox = (
      <input
        type="text"
        onClick={this.handleClick}
        onChange={this.filterList}
      />
    );
    const selectBox = this.state.filterData.map(option => (
      <li key={option.continent}>{option.continent}</li>
    ));

    return (
      <React.Fragment>
        <h2>Step 1</h2>
        <h3>Select a continent.</h3>
        {searchBox}
        {selectBox && <ul>{selectBox}</ul>}
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App