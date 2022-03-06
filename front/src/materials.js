import React from 'react';
import Table from './table';

function Materials(props) {
  const { data, fetchList, resource } = props;
  return (
    <div
      className="tab-pane fade table-responsive justify-content-center"
      id="materials"
      role="tabpanel"
      aria-labelledby="materials-tab"
    >
      <Table data={data} fetchList={fetchList} resource={resource} />
    </div>
  );
}

export default Materials;
