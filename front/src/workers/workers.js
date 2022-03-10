import React from 'react';
import { Table } from '../common';
import { AddWorkerForm } from './forms';

function Workers(props) {
  const { data, fetchList, resource, addWorkerAPI } = props;
  return (
    <div
      className="tab-pane fade show active table-responsive justify-content-center"
      id="workers"
      role="tabpanel"
      aria-labelledby="workers-tab"
    >
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#addWorkerForm"
          >
            Add Worker
          </button>
        </div>
      </div>
      <AddWorkerForm onSubmit={addWorkerAPI} />
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default Workers;
