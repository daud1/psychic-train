import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

function Loader({ loading }) {
  return loading ? (
    <div className="d-flex justify-content-center align-items-center modal">
      <div className=" modal-backdrop opacity-25"></div>
      <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : null;
}

function Pagination({ count, pagesCount, handlePrev, pageNo, handleNext }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`m-2 page-item ${pageNo === 1 || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" tabIndex="-1" onClick={handlePrev}>
            Previous
          </button>
        </li>
        <li className="m-2 page-item">
          <span className="page-link text-reset">
            {count} Records | Page {pageNo} of {pagesCount}
          </span>
        </li>
        <li className={`m-2 page-item ${pageNo === pagesCount || pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

function Tab(props) {
  const { label, active, onClick } = props;
  const _active = active ? ' active' : '';
  return (
    <li className="nav-item" role="presentation">
      <button onClick={() => onClick(label)} className={'nav-link' + _active} type="button" role="tab">
        {label}
      </button>
    </li>
  );
}

function Tabs({ children, brand }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        {brand ? brand : null}
        <ul className="nav nav-pills justify-content-center" role="tablist">
          {children.map((child) => {
            const { label } = child.props;
            return label !== '' ? (
              <Tab
                active={activeTab === label}
                key={label}
                label={label}
                onClick={() => setActiveTab(label)}
              />
            ) : null;
          })}
        </ul>
      </nav>

      <div className="tab-content">
        {children.map((child) => {
          return child.props.label === activeTab ? child : undefined;
        })}
      </div>
    </>
  );
}

function LineGraph({ label, data, legends }) {
  const { x, y } = legends;
  return (
    <div label={label} style={{ height: '55vh' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: y ? y : '',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: x ? x : '',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

function StatsCard({ title, stat }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <div className="card col-3" style={{ width: '20rem' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-uppercase">Current Total - UGX</h6>
        <p className="card-text fs-1">{stat ? numberWithCommas(stat):''}</p>
      </div>
    </div>
  );
}
export { Loader, Pagination, Tab, Tabs, LineGraph, StatsCard };
