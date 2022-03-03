import Materials from './materials';
import RequisitionLogs from './requisitionLogs';
import TimeSheets from './timesheets';
import Workers from './workers';
import { TabTitle } from './commonComponents';

function App() {
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
        <Workers />
        <TimeSheets />
        <Materials />
        <RequisitionLogs />
      </div>
    </div>
  );
}

export default App;
