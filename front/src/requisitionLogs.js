import React from 'react';
import Table from './table';
function RequisitionLogs(props) {
  const { data } = props;
  return (
    <div className="tab-pane fade" id="reqLogs" role="tabpanel" aria-labelledby="reqLogs-tab">
      <Table data={data} />
    </div>
  );
}

export default RequisitionLogs;
