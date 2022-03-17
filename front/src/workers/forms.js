import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Input, SubmitButton, ValidationSchema } from '../common/forms';

const { WORKER_SCHEMA, TIMESHEET_SCHEMA } = ValidationSchema;
const today = new Date();
const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

function AddWorkerForm({ handleSubmit, handleClose }) {
  return (
    <div
      className="card card-form"
      id="addWorkerForm"
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
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ last_name: '', first_name: '', date_of_birth: '', daily_rate_ugx: 0 }}
              validationSchema={WORKER_SCHEMA}
              onSubmit={(values) => handleSubmit(values)}
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
    </div>
  );
}

function LogHoursForm(props) {
  const { handleSubmit, workerID, lastLog, handleClose } = props;
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="logHoursFormLabel">
          Log Work Hours
        </h5>
        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {lastLog && lastLog.departure_time ? (
          <p>Done for Today!</p>
        ) : (
          <Formik
            initialValues={{
              worker: workerID,
              arrival_time: lastLog ? lastLog.arrival_time : null,
              departure_time: null,
              date: date,
            }}
            validationSchema={TIMESHEET_SCHEMA}
            onSubmit={(values) => {
              values.worker = workerID;
              handleSubmit(values);
            }}
          >
            {({ values, errors }) => {
              values.worker = workerID;
              return (
                <Form>
                  {console.log(errors)}
                  <Input label="Time In *" type="time" name="arrival_time" />
                  <Input label="Time Out" type="time" name="departure_time" />
                  <SubmitButton value="Log Hours" />
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
}

export { AddWorkerForm, LogHoursForm };
