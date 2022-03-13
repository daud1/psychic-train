import React from 'react';
import { Table } from '../common';

function RequisitionLogs(props) {
  const { data, fetchList } = props;
  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="reqLogs"
      role="tabpanel"
      aria-labelledby="reqLogs-tab"
    >
      <Table data={data} fetchList={fetchList} />
    </div>
  );
}

export default RequisitionLogs;
