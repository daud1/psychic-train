import { Form, Formik } from 'formik';
import React from 'react';
import { ValidationSchema, Input, SubmitButton } from '../common/forms';

const { MATERIAL_SCHEMA } = ValidationSchema;
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
                <Input label="Material Name" type="text" name="name" as="input" className="form-control" />
                <Input label="Units" type="text" name="units" as="input" className="form-control" />
                <Input label="Unit Price" type="name" name="unit_price" as="input" className="form-control" />
                <SubmitButton value="Add Material" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export { AddMaterialForm };
