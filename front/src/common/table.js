import React from 'react';
import {Pagination} from './components';

function Table(props) {
  const {
    resource,
    fetchList,
    data: { results, count, num_pages, previous, next, current },
  } = props;
  return results.length > 0 ? (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr key="titleRow">
            {Object.keys(results[0]).map((key, index) => (
              <th className="text-center" key={'head' + index} scope="col">
                {key}
              </th>
            ))}
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
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={count}
        pagesCount={num_pages}
        handleNext={() => fetchList(resource, next)}
        handlePrev={() => fetchList(resource, previous)}
        pageNo={current}
      />
    </>
  ) : (
    <p>No Records to display.</p>
  );
}
export default Table;
