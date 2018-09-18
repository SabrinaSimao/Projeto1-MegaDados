import ReactTable from "react-table";
import "react-table/react-table.css";
import React from "react";
import "./App.css";
import PropTypes from "prop-types";



class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <ReactTable
          data ={this.props.data}
          columns = {this.props.columns}
          defaultPageSize={this.props.results}
          showPagination={this.props.showPagination}
        />
      </div>
    );
  }
}

export default Table;

