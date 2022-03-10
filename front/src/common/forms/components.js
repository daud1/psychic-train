import React from 'react';
import { Field, ErrorMessage } from 'formik';

function Input(props) {
  const { as, type, name, label } = props;
  return (
    <label className="form-label">
      {label}
      <Field as={as} className="form-control" type={type} name={name} {...props} />
      <ErrorMessage name={name} component="span" className="text-danger" />
    </label>
  );
}

function SubmitButton(props) {
  const { value } = props;
  return (
    <button {...props} type="submit" className="btn btn-primary">
      {value}
    </button>
  );
}

export { Input, SubmitButton };
