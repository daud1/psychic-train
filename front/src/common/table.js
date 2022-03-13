import React, { useState } from 'react';
import { Pagination } from './components';

function Table(props) {
  const {
    fetchList,
    Extra,
    data: { results, count, num_pages, previous, next, current },
  } = props;
  const [activeObjId, setActiveObjId] = useState(null);

  return results && results.length > 0 ? (
    <>
      {Extra && activeObjId !== null ? Extra(activeObjId) : null}
      <table className="table table-striped table-hover">
        <thead>
          <tr key="titleRow">
            {Object.keys(results[0]).map((key, index) => (
              <th className="text-center" key={'head' + index} scope="col">
                {key}
              </th>
            ))}
            {Extra ? <th>Actions</th> : null}
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
              {Extra ? (
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#logHoursForm"
                    onClick={() => setActiveObjId(obj.id)}
                  >
                    Log Hours
                  </button>
                </td>
              ) : null}
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
