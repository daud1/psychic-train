import React from 'react';
import { Table } from '../common';
import { LogTimeInForm, LogTimeOutForm } from './forms';

function TimeSheets(props) {
  const { data, fetchList, resource, checkInAPI, checkOutAPI } = props;
  return (
    <div
      className="tab-pane fade table-responsive justify-content-center"
      id="timesheets"
      role="tabpanel"
      aria-labelledby="timesheets-tab"
    >
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#clockInForm"
          >
            Log Time In
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#clockOutForm"
          >
            Log Time Out
          </button>
        </div>
      </div>
      <LogTimeInForm onSubmit={checkInAPI}/>
      <LogTimeOutForm onSubmit={checkOutAPI}/>
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default TimeSheets;
