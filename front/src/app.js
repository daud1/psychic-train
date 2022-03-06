import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TabTitle } from './commonComponents';
import Materials from './materials';
import RequisitionLogs from './requisitionLogs';
import TimeSheets from './timesheets';
import Workers from './workers';


function App() {
  const [data, setData] = useState({
    workers: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    attendance: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    materials: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    requests: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });
  const fetchInitialData = async () => {
    // setLoading(true);
    try {
      let keys = ['workers', 'attendance', 'materials', 'requests'];
      const res = await Promise.allSettled(
        keys.map((key) => axios.get(`http://localhost:8000/api/v1/${key}/`))
      );
      const payload = res.map((res) => {
        return res.status === 'fulfilled' ? res.value.data : null;
      });
      let _data = {};
      keys.forEach((key, index) => (_data[key] = payload[index]));
      setData(_data);
    } catch (e) {
      console.log(e);
    } // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => fetchInitialData(), []);
  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand h1" href="#">
          TUZIMBE
        </a>
        <ul className="nav nav-pills justify-content-center" id="myTab" role="tablist">
          <TabTitle active id="workers" value="Workers" />
          <TabTitle id="timesheets" value="TimeSheets" />
          <TabTitle id="materials" value="Materials" />
          <TabTitle id="reqLogs" value="Requisition Logs" />
        </ul>
      </nav>

      <div className="tab-content" id="myTabContent">
        <Workers data={data.workers} />
        <TimeSheets data={data.attendance} />
        <Materials data={data.materials} />
        <RequisitionLogs data={data.requests} />
      </div>
    </div>
  );
}

export default App;
