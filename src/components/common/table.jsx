import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  movies,
  sortColumn,
  onSort,
  columns,
  onDelete,
  onLikeClicked,
}) => {
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} onSort={onSort} columns={columns} />
      <TableBody
        data={movies}
        columns={columns}
        onDelete={onDelete}
        onLikeClicked={onLikeClicked}
      />
    </table>
  );
};

export default Table;
