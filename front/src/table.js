import React from 'react';
import { Pagination } from './commonComponents';

function Table(props) {
  const {
    data: { results, count, num_pages, previous, next, current },
  } = props;
  return results.length > 0 ? (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          {Object.keys(results[0]).map((key, index) => (
            <th key={'head' + index} scope="col">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((obj, index) => (
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
      <Pagination
        count={count}
        pagesCount={num_pages}
        handleNext={next}
        handlePrev={previous}
        pageNo={current}
      />
    </table>
  ) : (
    <p>No Records to display.</p>
  );
}
export default Table;
