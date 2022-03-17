import React, { useState } from 'react';
import { Pagination } from './components';

function Table(props) {
  const {
    fetchList,
    actions,
    data: { results, count, num_pages, previous, next, current },
  } = props;

  return results && results.length > 0 ? (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr key="titleRow">
            {Object.keys(results[0]).map((key, index) => (
              <th className="text-center" key={'head' + index} scope="col">
                {key}
              </th>
            ))}
            {actions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody className="justify-content-center">
          {results.map((obj, index) => (
            <tr key={'row' + index}>
              {Object.entries(obj).map(([k, v], index) => (
                <td className="text-center" key={'rowV' + index}>
                  {k === 'id' && typeof v === 'string' ? v.slice(0, 8) : v}
                </td>
              ))}
              <td>
                {actions && Object.keys(actions).length > 0
                  ? Object.entries(actions).map(([label, func], index) => (
                      <button
                        key={'actBTN' + index}
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => func(obj.id)}
                      >
                        {label}
                      </button>
                    ))
                  : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={count}
        pagesCount={num_pages}
        handleNext={() => fetchList(next)}
        handlePrev={() => fetchList(previous)}
        pageNo={current}
      />
    </>
  ) : (
    <p>No Records to display.</p>
  );
}
export default Table;
