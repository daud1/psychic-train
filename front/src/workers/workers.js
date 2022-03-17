import React, { useState } from 'react';
import { Table } from '../common';
import { AddWorkerForm, LogHoursForm } from './forms';

function Workers(props) {
  const {
    data,
    fetchList,
    addWorkerAPI,
    logHoursAPI: { add, getOne },
  } = props;
  const [activeObjId, setActiveObjId] = useState(null);
  const [_showModal, setShowModal] = useState(false);
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [lastLog, setLastLog] = useState(null);

  const showModal = (objId) => {
    let _lastLog = getOne(objId);
    setLastLog(_lastLog);
    setActiveObjId(objId);
    setShowModal(true);
  };

  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="workers"
      role="tabpanel"
      aria-labelledby="workers-tab"
    >
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-outline-primary" onClick={() => setShowWorkerForm(true)}>
            Add Worker
          </button>
        </div>
      </div>
      {showWorkerForm ? (
        <AddWorkerForm
          handleClose={() => setShowWorkerForm(false)}
          handleSubmit={(values) => addWorkerAPI(values, () => setShowWorkerForm(false))}
        />
      ) : null}
      {_showModal ? (
        <LogHoursForm
          handleSubmit={(values) => add(values, () => setShowModal(false))}
          handleClose={() => setShowModal(false)}
          workerID={activeObjId}
          lastLog={lastLog}
        />
      ) : null}
      <Table data={data} fetchList={fetchList} actions={{ 'Log Hours': showModal }} />
    </div>
  );
}

export default Workers;
