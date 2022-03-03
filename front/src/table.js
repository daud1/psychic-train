import React from 'react';

function Table(props) {
  const { data } = props;
  return data ? (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          {Object.keys(data[0]).map((key, index) => (
            <th key={'head' + index} scope="col">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
          <tr>
            <th key={'rowC' + index} scope="row">
              {index}
            </th>
            {Object.values(obj).map((v, index) => (
              <td key={'rowV' + index}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No Records to display.</p>
  );
}
export default Table;
