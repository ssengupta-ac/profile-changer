import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

const SignupForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
            axios.post('http://localhost:3001/signup', values)
              .then(response => {
                alert(response.data); // "You have been signed up!" message
                resetForm();
                setStatus({ success: true });
              })
              .catch(error => {
                alert("Your signup failed!");
                setStatus({ success: false });
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, status }) => (

            <Form className="space-y-6 text-black">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <Field name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field name="password" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-2" />
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <Field name="firstName" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-2" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <Field name="lastName" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-2" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Field name="address" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-2" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up
              </button>
              <div className="text-center my-20">
                <p className="text-red-500 text-xl">Already have a login?
                  <Link href="/" className="text-blue-500 underline">Go to Login</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
