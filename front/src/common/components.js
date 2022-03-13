import React, { useState } from 'react';

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

function Tab(props) {
  const { label, active, onClick } = props;
  const _active = active ? ' active' : '';
  return (
    <li className="nav-item" role="presentation">
      <button onClick={() => onClick(label)} className={'nav-link' + _active} type="button" role="tab">
        {label}
      </button>
    </li>
  );
}

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="display-6 text-reset text-decoration-none" href="#">
          tuzimbe.
        </a>
        <ul className="nav nav-pills justify-content-center" role="tablist">
          {children.map((child) => {
            const { label } = child.props;
            return label !== '' ? (
              <Tab
                active={activeTab === label}
                key={label}
                label={label}
                onClick={() => setActiveTab(label)}
              />
            ) : null;
          })}
        </ul>
      </nav>

      <div className="tab-content">
        {children.map((child) => {
          return child.props.label === activeTab ? child : undefined;
        })}
      </div>
    </>
  );
}
export { Loader, Pagination, Tab, Tabs };
