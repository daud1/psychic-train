import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Loader, Tabs } from './common';
import { MainContext } from './mainContext';
import { Materials, RequisitionLogs } from './materials';
import { TimeSheets, Workers } from './workers';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';
function App() {
  const { loading, setLoading } = useContext(MainContext);
  const [workers, setWorkers] = useState({
    workers: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });
  const [attendance, setAttendance] = useState({
    attendance: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });
  const [materials, setMaterials] = useState({
    materials: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });
  const [requests, setRequests] = useState({
    requests: { count: 0, current: 0, next: '', previous: '', num_pages: 0, results: [] },
  });

  const fetchList = async (resource, data, setter, page = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}${resource}/${page}`);
      if (response.status === 200) {
        const _data = JSON.parse(JSON.stringify(data));
        setter({ ..._data, ...response.data });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (resource, payload, data, setter, cleanUp = null) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}${resource}/`, payload);
      if (response.status === 201) {
        const _data = JSON.parse(JSON.stringify(data));
        _data.results = [response.data, ..._data.results];
        _data.count += 1;
        setter(_data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (cleanUp !== null) {
        cleanUp();
      }
      setLoading(false);
    }
  };

  const fetchItem = async (resource, id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}${resource}/${id}`);
      if (response.status === 200) {
        return response.data;
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
      let DATA = { workers, attendance, materials, requests };
      let SETTERS = {
        workers: setWorkers,
        attendance: setAttendance,
        materials: setMaterials,
        requests: setRequests,
      };
      let calls = keys.map((key) => fetchList(key, DATA[key], SETTERS[key]));
      let _ = await Promise.allSettled(calls);
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
      <Tabs>
        <Workers
          label="Workers"
          data={workers}
          fetchList={(page) => fetchList('workers', workers, setWorkers, page)}
          addWorkerAPI={(values, cleanUp) => addItem('workers', values, workers, setWorkers, cleanUp)}
          logHoursAPI={{
            add: (values, cleanUp) => addItem('attendance', values, attendance, setAttendance, cleanUp),
            getOne: (id) => fetchItem('attendance', id),
          }}
        />
        <TimeSheets
          label="TimeSheets"
          data={attendance}
          fetchList={(page) => fetchList('timesheets', attendance, setAttendance, page)}
        />
        <Materials
          label="Materials"
          data={materials}
          fetchList={(page) => fetchList('materials', materials, setMaterials, page)}
          addMaterialAPI={(values) => addItem('materials', values, materials, setMaterials)}
        />
        <RequisitionLogs
          label="RequisitionLogs"
          data={requests}
          fetchList={(page) => fetchList('requests', requests, setRequests, page)}
          requestMaterialsAPI={(values) => addItem('requests', values, requests, setRequests)}
        />
      </Tabs>
    </div>
  );
}

export default App;
