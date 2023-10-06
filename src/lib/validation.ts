import * as Yup from 'yup';

// Define the email validation schema
export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});
