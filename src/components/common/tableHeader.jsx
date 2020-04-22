import React, { Component } from "react";

class TableHeader extends Component {
  state = {};

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.label) return;

    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" aria-hidden="true"></i>
    ) : (
      <i className="fa fa-sort-desc" aria-hidden="true"></i>
    );
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
