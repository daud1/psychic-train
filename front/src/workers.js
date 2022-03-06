import React from 'react';
import Table from './table';

function Workers(props) {
  const { data, fetchList, resource } = props;
  return (
    <div
      className="tab-pane fade show active table-responsive justify-content-center"
      id="workers"
      role="tabpanel"
      aria-labelledby="workers-tab"
    >
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default Workers;
