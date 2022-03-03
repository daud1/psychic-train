import React from 'react';
import Table from './table';
function TimeSheets(props) {
  const { data } = props;
  return (
    <div className="tab-pane fade" id="timesheets" role="tabpanel" aria-labelledby="timesheets-tab">
      <Table data={data} />
    </div>
  );
}

export default TimeSheets;
