import React, { Component } from "react";
import MyTable from "./MyTable";

export class PostList extends Component {
  // constructor
  constructor(props) {
    super(props);
    // initialze state
    this.state = {
      searchkey: "",
      matchingNameData: [],
      filteredDetails: [],
      itemData: [],
      result: [],
      addedItems: [],
      quantity: 1,
      itemTotal: "",
      totalBill: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  // componentDidMount function to fetch locally stored json data
  componentDidMount() {
    fetch("./data/Postdata.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          itemData: data
        });
      });
  }

  // handleChange handler function to read input value
  handleChange = e => {
    var key = e.target.value;
    var myRegx = new RegExp(key, "ig");
    const matchedNameList = this.state.itemData.filter(item => {
      return myRegx.exec(item.itemName);
    });

    this.setState(
      {
        matchingNameData: matchedNameList,
        searchkey: e.target.value
      },
      () => {
        console.log(this.state.matchingNameData);
        // console.log(this.state.matchingCodeData);
      }
    );
  };

  //addIItemList listener to add items to the cart
  addItemtoList = (item, index) => {
    let addedArray = this.state.addedItems;
    addedArray.push(item);
    let matchingArray = this.state.matchingNameData;
    const filteredArray = matchingArray.filter(
      row => row.itemCode !== item.itemCode
    );

    this.setState({
      addedItems: addedArray,
      matchingNameData: filteredArray
    });
    this.addSubTotal();
  };

  addSubTotal = () => {
    let sum = 0;
    this.state.addedItems.forEach(item => {
      sum = sum + item.total;
    });

    this.setState({
      totalBill: sum
    });
  };

  handleQtyChange(item, e) {
    let tempmatchingNameData = [...this.state.matchingNameData];
    const selectedProduct = tempmatchingNameData.find(
      row => row.itemCode === item.itemCode
    );
    const index = tempmatchingNameData.indexOf(selectedProduct);
    const product = tempmatchingNameData[index];
    product.quantity = e;
    product.total = product.quantity * product.UnitPrice;

    this.setState(() => {
      return { matchingNameData: [...tempmatchingNameData] };
    });
  }

  deleteItem(item) {
    let itemArray = this.state.addedItems;
    const filteredArray = itemArray.filter(
      row => row.itemCode !== item.itemCode
    );
      
    this.setState({
      addedItems: filteredArray,
    })
    // this.totalAfterDeletion();
  }

  // totalAfterDeletion = () => {
  //   let sum = 0;
  //   this.state.addedItems.forEach(item => {
  //     sum = sum + item.total;
  //   });

  //   this.setState({
  //     totalBill: sum
  //   });
  // }

  render() {
    return (
      <div className="container">
        <div className="search-wrapper">
          <label>Enter Item Name</label>
          <input
            placeholder="Enter item code or item name"
            name="itemcode"
            onChange={this.handleChange.bind(this)}
          />
        </div>

        <div>
          <table className="table-wrapper">
            <MyTable
              type="search"
              heading="Shopping List"
              data={this.state.matchingNameData}
              handleQtyChange={this.handleQtyChange.bind(this)}
              addItemtoList={this.addItemtoList}
            />
          </table>
        </div>

        <div>
          <table className="sub-table-wrapper">
            <MyTable
              type="added"
              heading="Shopping Cart"
              deleteRow={this.deleteItem}
              data={this.state.addedItems}
            />
          </table>
        </div>
        <div className="total_bill">
          <p className="label_bill">Total Bill: </p>
          <p>{this.state.totalBill}</p>
        </div>
      </div>
    );
  }
}

export default PostList;
