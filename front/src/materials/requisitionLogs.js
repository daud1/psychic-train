import React from 'react';
import { Table } from '../common';
import { RequestMaterialForm } from './forms';
function RequisitionLogs(props) {
  const { data, fetchList, requestMaterialsAPI } = props;
  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="reqLogs"
      role="tabpanel"
      aria-labelledby="reqLogs-tab"
    >
      <div className="btn-toolbar" role="toolbar" aria-label="actions-toolbar">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#getMaterialForm"
          >
            Request Material
          </button>
        </div>
      </div>
      <RequestMaterialForm onSubmit={(values) => requestMaterialsAPI(values)} />
      <Table data={data} fetchList={fetchList} />
    </div>
  );
}

export default RequisitionLogs;
