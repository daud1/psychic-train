import React from 'react';
import Table from './table';
function Workers(props) {
  const { data } = props;
  return (
    <div className="tab-pane fade show active" id="workers" role="tabpanel" aria-labelledby="workers-tab">
      <Table data={data} />
    </div>
  );
}

export default Workers;
