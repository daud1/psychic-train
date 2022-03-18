import React, { useEffect, useState } from 'react';
import { Tabs, LineGraph, StatsCard } from './common';

const _data = [
  {
    id: 'japan',
    color: 'hsl(347, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 248,
      },
      {
        x: 'helicopter',
        y: 77,
      },
      {
        x: 'boat',
        y: 170,
      },
      {
        x: 'train',
        y: 7,
      },
      {
        x: 'subway',
        y: 253,
      },
      {
        x: 'bus',
        y: 62,
      },
      {
        x: 'car',
        y: 262,
      },
      {
        x: 'moto',
        y: 284,
      },
      {
        x: 'bicycle',
        y: 221,
      },
      {
        x: 'horse',
        y: 200,
      },
      {
        x: 'skateboard',
        y: 233,
      },
      {
        x: 'others',
        y: 86,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(9, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 174,
      },
      {
        x: 'helicopter',
        y: 297,
      },
      {
        x: 'boat',
        y: 4,
      },
      {
        x: 'train',
        y: 284,
      },
      {
        x: 'subway',
        y: 268,
      },
      {
        x: 'bus',
        y: 82,
      },
      {
        x: 'car',
        y: 177,
      },
      {
        x: 'moto',
        y: 60,
      },
      {
        x: 'bicycle',
        y: 146,
      },
      {
        x: 'horse',
        y: 269,
      },
      {
        x: 'skateboard',
        y: 295,
      },
      {
        x: 'others',
        y: 111,
      },
    ],
  },
];

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
