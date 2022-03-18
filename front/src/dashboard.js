import React, { useEffect, useState } from 'react';
import { Tabs, LineGraph, StatsCard } from './common';

function Dashboard({ data }) {
  const [week, setWeekly] = useState([]);
  const [month, setMonthly] = useState([]);
  const [year, setYearly] = useState([]);
  const [current, setCurrent] = useState([]);

  const cleanData = (data) => {
    // map date-string to 'x' and totals to 'y'
    const _data = JSON.parse(JSON.stringify(data));
    const setters = { monthly: setMonthly, weekly: setWeekly, yearly: setYearly };
    if (Object.keys(_data).length > 0) {
      setCurrent(_data.current);
      delete _data.current;
      Object.entries(_data).map(([k, v]) => {
        const _v = v.map((i) => ({
          x: `${i.year}${i.month ? '/' + i.month : ''}${i.week ? '/' + i.week : ''}`, // date-string
          y: i.total,
        }));
        setters[k](_v);
      });
    }
  };

  useEffect(() => cleanData(data), [data]);

  return (
    <div className="container-fluid">
      {Object.keys(current).length > 0 ? (
        <div className="row justify-content-between p--8">
          {Object.entries(current).map(([k, v], i) => (
            <StatsCard title={k} stat={v.total} key={'statCard' + i} />
          ))}
        </div>
      ) : (
        <p>No data insights yet.</p>
      )}

      <Tabs>
        <LineGraph
          label="Week"
          legends={{ x: 'WEEKS', y: 'QUANTITY' }}
          data={[{ id: 'weekly', data: week }]}
        />
        <LineGraph
          label="Month"
          legends={{ x: 'MONTHS', y: 'QUANTITY' }}
          data={[{ id: 'monthly', data: month }]}
        />
        <LineGraph
          label="Year"
          legends={{ x: 'YEARS', y: 'QUANTITY' }}
          data={[{ id: 'yearly', data: year }]}
        />
      </Tabs>
    </div>
  );
}
export default Dashboard;
