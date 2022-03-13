import React from 'react';
import { Table } from '../common';

function TimeSheets(props) {
  const { data, fetchList, checkInAPI, checkOutAPI} = props;
  return (
    <div
      className="tab-pane fade active table-responsive justify-content-center show"
      id="timesheets"
      role="tabpanel"
      aria-labelledby="timesheets-tab"
    >
      <Table data={data} fetchList={fetchList} />
    </div>
  );
}

export default TimeSheets;
