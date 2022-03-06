import React from 'react';
import Table from './table';

function TimeSheets(props) {
  const { data, fetchList, resource } = props;
  return (
    <div
      className="tab-pane fade table-responsive justify-content-center"
      id="timesheets"
      role="tabpanel"
      aria-labelledby="timesheets-tab"
    >
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default TimeSheets;
