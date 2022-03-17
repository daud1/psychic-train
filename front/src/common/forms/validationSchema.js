import * as Yup from 'yup';

const ValidationSchema = {
  MATERIAL_SCHEMA: Yup.object().shape({
    name: Yup.string().required('Required!'),
    units: Yup.string().required('Required!'),
    unit_price: Yup.number().required('Required!'),
  }),
  WORKER_SCHEMA: Yup.object().shape({
    first_name: Yup.string().required('Required!'),
    last_name: Yup.string().required('Required!'),
    date_of_birth: Yup.date().required('Required!'),
    daily_rate_ugx: Yup.number('Enter daily rate(UGX) in numbers'),
  }),
  TIMESHEET_SCHEMA: Yup.object().shape({
    worker: Yup.string().required('Required'),
    arrival_time: Yup.string(),
    departure_time: Yup.string().nullable(true),
  }),
  REQUEST_SCHEMA: Yup.object().shape({
    material: Yup.string().required('Required!'),
    quantity: Yup.number().required('Required!'),
    date_requested: Yup.date().nullable('True'),
  }),
};

export default ValidationSchema;
