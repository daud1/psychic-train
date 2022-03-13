import React from 'react';
import { Table } from '../common';
import { AddMaterialForm } from './forms';

function Materials(props) {
  const { data, fetchList, addMaterialAPI } = props;
  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="materials"
      role="tabpanel"
      aria-labelledby="materials-tab"
    >
      <div
        className="btn-toolbar justify-content-center"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#addMaterialForm"
          >
            Add Material
          </button>
        </div>
      </div>
      <AddMaterialForm onSubmit={addMaterialAPI} />
      <Table data={data} fetchList={fetchList} />
    </div>
  );
}

export default Materials;
