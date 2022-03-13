import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Input, SubmitButton, ValidationSchema } from '../common/forms';

const { WORKER_SCHEMA, TIMESHEET_SCHEMA } = ValidationSchema;
const today = new Date();
const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

function AddWorkerForm({ onSubmit }) {
  return (
  <div
      className="modal fade"
      id="addWorkerForm"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addWorkerFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addWorkerFormLabel">
              Register New Worker
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ last_name: '', first_name: '', date_of_birth: '', daily_rate_ugx: 0 }}
              validationSchema={WORKER_SCHEMA}
              onSubmit={(values) => onSubmit(values)}
            >
              <Form>
                <Input label="First Name" type="text" name="first_name" as="input" />
                <Input label="Last Name" type="text" name="last_name" as="input" />
                <Input label="Date of Birth" type="date" name="date_of_birth" as="input" />
                <Input label="Daily Rate" type="number" name="daily_rate_ugx" as="input" />
                <SubmitButton value="Register Worker" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>)
  ;
}

function LogHoursForm(props) {
  const { handleSubmit, workerID, fetchLastLog } = props;
  const [lastLog, setLastLog] = useState(null);
  useEffect(() => setLastLog(fetchLastLog(workerID)), []);
  return (
    <div
      className="modal fade"
      id="logHoursForm"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="logHoursFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="logHoursFormLabel">
              Log Work Hours
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {lastLog && lastLog.departure_time ? <p>Already Logged Time!</p> : (
              <Formik
                initialValues={{
                  worker: workerID,
                  arrival_time: lastLog ? lastLog.arrival_time : '',
                  departure_time: '',
                  date: date,
                }}
                validationSchema={TIMESHEET_SCHEMA}
                onSubmit={(values) => {
                  values.worker = workerID;
                  handleSubmit(values);
                }}
              >
                {({ errors }) => (
                  <Form>
                    {console.log(errors)}
                    <Input label="Time In *" type="time" name="arrival_time" />
                    <Input label="Time Out" type="time" name="departure_time" />
                    <SubmitButton value="Log Hours" />
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddWorkerForm, LogHoursForm };
