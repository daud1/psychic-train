import React from 'react';
import { Table } from '../common';

function RequisitionLogs(props) {
  const { data, fetchList, resource } = props;
  return (
    <div
      className="tab-pane fade table-responsive justify-content-center"
      id="reqLogs"
      role="tabpanel"
      aria-labelledby="reqLogs-tab"
    >
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default RequisitionLogs;
