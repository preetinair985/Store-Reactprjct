import React, { Component } from "react";

export class MyTable extends Component {
  qtyChanged(item, e) {
    this.props.handleQtyChange(item, e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <thead>
          <p className="heading">{this.props.heading}</p>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Unit Price</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((item, i) => (
            <tr key={i}>
              <td className="cell_item">{item.itemCode}</td>
              <td className="cell_item">{item.itemName}</td>
              <td className="cell_unitprice">{item.UnitPrice}</td>
              <td className="cell_item">{item.Unit}</td>
              <td className="cell_quant">
                <input
                  onChange={this.qtyChanged.bind(this, item)}
                  className="cell_quanttxt"
                  value={item.quantity}
                />
              </td>
              <td className="cell_item">{item.total}</td>
              {this.props.type === "search" ? (
                <td className="cell_additembtn">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.addItemtoList(item);
                    }}
                    className="additem_btn"
                  >
                    Add Item
                  </button>
                </td>
              ) : (
                " "
              )}
              {this.props.type === "added" ? (
                <td className="cell_additembtn">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.deleteRow(item);
                    }}
                    className="additem_btn"
                  >
                    Delete Item
                  </button>
                </td>
              ) : (
                " "
              )}

            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default MyTable;
