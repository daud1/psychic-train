import React from 'react';

export function TabTitle(props) {
  const { id, value, active } = props;
  const _active = active ? ' active' : '';
  return (
    <li className="nav-item" role="presentation">
      <button
        className={'nav-link' + _active}
        id={id + '-tab'}
        data-bs-toggle="tab"
        data-bs-target={'#' + id}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected="true"
      >
        {value}
      </button>
    </li>
  );
}

export function Pagination({ count, pagesCount, handlePrev, pageNo, handleNext }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${pageNo === 1 || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" tabindex="-1" onClick={handlePrev}>
            Previous
          </button>
        </li>
        <li className="page-item">
          {count} Records &nbsp;| Page {pageNo} of {pagesCount}
        </li>
        <li className={`page-item ${pageNo === pagesCount || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
