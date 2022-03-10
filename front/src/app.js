import axios from 'axios';
import $ from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { Loader, TabTitle } from './common';
import { MainContext } from './mainContext';
import { Materials, RequisitionLogs } from './materials';
import { TimeSheets, Workers } from './workers';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';
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
      const response = await axios.get(`${baseURL}${resource}/${page}`);
      if (response.status === 200) {
        setData({ ...data, [resource]: response.data });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (resource, payload, handleClose = null) => {
    const { [resource]: temp } = data;
    let _temp = JSON.parse(JSON.stringify(data));
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}${resource}/`, payload);
      if (response.status == 201) {
        const _data = JSON.parse(JSON.stringify(temp));
        _data.results.unshift(response.data);
        _data.count += 1;
        _temp[resource] = _data;
        setData(_temp);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (handleClose !== null) {
        handleClose();
      }
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      let keys = ['workers', 'attendance', 'materials', 'requests'];
      const response = await Promise.allSettled(keys.map((key) => axios.get(`${baseURL}${key}/`)));
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

      {!loading && (
        <div className="tab-content" id="myTabContent">
          <Workers
            data={data.workers}
            fetchList={fetchList}
            resource="workers"
            addWorkerAPI={(values) => addItem('workers', values)}
          />
          <TimeSheets
            data={data.attendance}
            fetchList={fetchList}
            resource="attendance"
            checkInAPI={(values) => addItem('attendance', values)}
            checkOutAPI={(values) => addItem('attendance', values)}
          />
          <Materials
            data={data.materials}
            fetchList={fetchList}
            resource="materials"
            addMaterialAPI={(values) => addItem('materials', values)}
          />
          <RequisitionLogs data={data.requests} fetchList={fetchList} resource="requests" />
        </div>
      )}
    </div>
  );
}

export default App;
