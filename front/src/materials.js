import React from 'react';
import Table from './table';
function Materials(props) {
  const { data } = props;
  return (
    <div className="tab-pane fade" id="materials" role="tabpanel" aria-labelledby="materials-tab">
      <Table data={data} />
    </div>
  );
}

export default Materials;
