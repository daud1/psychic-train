import React from 'react';
import { Table } from '../common';
import { AddWorkerForm, LogHoursForm } from './forms';

function Workers(props) {
  const {
    data,
    fetchList,
    addWorkerAPI,
    logHoursAPI: { add, getOne },
  } = props;
  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="workers"
      role="tabpanel"
      aria-labelledby="workers-tab"
    >
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="actions-toolbar">
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
      <AddWorkerForm onSubmit={(values) => addWorkerAPI(values)} />
      <Table
        data={data}
        fetchList={fetchList}
        Extra={(worker_id) => (
          <LogHoursForm handleSubmit={(values) => add(values)} workerID={worker_id} fetchLastLog={getOne} />
        )}
      />
    </div>
  );
}

export default Workers;
