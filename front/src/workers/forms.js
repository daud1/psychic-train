import { Form, Formik } from 'formik';
import React from 'react';
import { ValidationSchema, Input, SubmitButton } from '../common/forms';

const { WORKER_SCHEMA, TIMESHEET_SCHEMA } = ValidationSchema;

function AddWorkerForm({ onSubmit }) {
  return (
    <div
      className="modal fade"
      id="addWorkerForm"
      data-bs-backdrop="static"
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
                <Input label="First Name" type="text" name="first_name" as="input" className="form-control" />
                <Input label="Last Name" type="text" name="last_name" as="input" className="form-control" />
                <Input
                  label="Date of Birth"
                  type="date"
                  name="date_of_birth"
                  as="input"
                  className="form-control"
                />
                <Input
                  label="Daily Rate"
                  type="number"
                  name="daily_rate_ugx"
                  as="input"
                  className="form-control"
                />
                <SubmitButton value="Register Worker" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogTimeInForm({ onSubmit }) {
  return (
    <div
      className="modal fade"
      id="clockInForm"
      // data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="clockInFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="clockInFormLabel">
              Log Arrival Time
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ worker_id: '', arrival_time: '' }}
              validationSchema={TIMESHEET_SCHEMA}
              onSubmit={(values) => onSubmit(values)}
            >
              <Form>
                <Input label="Worker" type="text" name="worker_id" className="form-control" />
                <Input label="Time In" type="time" name="arrival_time" className="form-control" />
                <SubmitButton value="Check In" />
              </Form>
            </Formik>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogTimeOutForm({ onSubmit }) {
  return (
    <div
      className="modal fade"
      id="clockOutForm"
      // data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="clockOutFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="clockOutFormLabel">
              Log Departure Time
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ worker_id: '', departure_time: '' }}
              validationSchema={TIMESHEET_SCHEMA}
              onSubmit={(values) => onSubmit(values)}
            >
              <Form>
                <Input label="Worker" type="text" name="worker_id" className="form-control" />
                <Input label="Time Out" type="time" name="departure_time" className="form-control" />
                <SubmitButton value="Check Out" />
              </Form>
            </Formik>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddWorkerForm, LogTimeInForm, LogTimeOutForm };
