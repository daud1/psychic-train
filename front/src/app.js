import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Loader, TabTitle } from './commonComponents';
import { MainContext } from './mainContext';
import Materials from './materials';
import RequisitionLogs from './requisitionLogs';
import TimeSheets from './timesheets';
import Workers from './workers';

function App() {
  const { loading, setLoading } = useContext(MainContext);
  const [data, setData] = useState({
    workers: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    attendance: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    materials: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
    requests: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });

  const fetchList = async (resource, page = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/${resource}/${page}`);
      if (response.status === 200) {
        setData({ ...data, [resource]: response.data });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      let keys = ['workers', 'attendance', 'materials', 'requests'];
      const response = await Promise.allSettled(
        keys.map((key) => axios.get(`http://localhost:8000/api/v1/${key}/`))
      );
      const payload = response.map((res) => (res.status === 'fulfilled' ? res.value.data : null));
      let _data = {};
      keys.forEach((key, index) => (_data[key] = payload[index]));
      setData(_data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchInitialData(), []);
  return (
    <div className="container">
      <Loader loading={loading} />
      <nav className="navbar navbar-light bg-light">
        <a className="display-6 text-reset text-decoration-none" href="#">
          tuzimbe.
        </a>
        <ul className="nav nav-pills justify-content-center" id="myTab" role="tablist">
          <TabTitle active id="workers" value="Workers" />
          <TabTitle id="timesheets" value="TimeSheets" />
          <TabTitle id="materials" value="Materials" />
          <TabTitle id="reqLogs" value="Requisition Logs" />
        </ul>
      </nav>

      <div className="tab-content" id="myTabContent">
        <Workers data={data.workers} fetchList={fetchList} resource="workers" />
        <TimeSheets data={data.attendance} fetchList={fetchList} resource="attendance" />
        <Materials data={data.materials} fetchList={fetchList} resource="materials" />
        <RequisitionLogs data={data.requests} fetchList={fetchList} resource="requests" />
      </div>
    </div>
  );
}

export default App;
