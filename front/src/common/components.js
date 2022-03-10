import React from 'react';

function Loader({ loading }) {
  return loading ? (
    <div className="d-flex justify-content-center align-items-center modal">
      <div className=" modal-backdrop opacity-25"></div>
      <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : null;
}

function Pagination({ count, pagesCount, handlePrev, pageNo, handleNext }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`m-2 page-item ${pageNo === 1 || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" tabIndex="-1" onClick={handlePrev}>
            Previous
          </button>
        </li>
        <li className="m-2 page-item">
          <span className="page-link text-reset">
            {count} Records | Page {pageNo} of {pagesCount}
          </span>
        </li>
        <li className={`m-2 page-item ${pageNo === pagesCount || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

function TabTitle(props) {
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
export {Loader, Pagination, TabTitle} 