import { Form, Formik } from 'formik';
import React from 'react';
import { ValidationSchema, Input, SubmitButton } from '../common/forms';

const { MATERIAL_SCHEMA, REQUEST_SCHEMA } = ValidationSchema;
function AddMaterialForm({ onSubmit }) {
  return (
    <div
      className="modal fade"
      id="addMaterialForm"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addMaterialFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addMaterialFormLabel">
              Add Material
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '', units: '', unit_price: '' }}
              validationSchema={MATERIAL_SCHEMA}
              onSubmit={(values) => onSubmit(values)}
            >
              <Form>
                <Input label="Material Name" type="text" name="name" as="input" />
                <Input label="Units" type="text" name="units" as="input" />
                <Input label="Unit Price" type="number" name="unit_price" as="input" />
                <SubmitButton value="Add Material" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestMaterialForm({ onSubmit }) {
  return (
    <div
      className="modal fade"
      id="getMaterialForm"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="getMaterialFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="getMaterialFormLabel">
              Request Material
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ material_id: '', quantity: '', date_requested: '' }}
              validationSchema={REQUEST_SCHEMA}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ errors }) => (
                <Form>
                  {console.log(errors)}
                  <Input label="Material" type="text" name="material_id" as="input" />
                  <Input label="Quantity" type="number" name="quantity" as="input" />
                  <Input label="Date Requested" type="date" name="date_requested" as="input" />
                  <SubmitButton value="Submit Request" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export { AddMaterialForm, RequestMaterialForm };
