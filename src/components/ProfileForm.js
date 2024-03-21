import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProfileSchema = Yup.object().shape({
  birthday: Yup.date().required('Birthday is required'),
  favoriteColor: Yup.string().required('Favorite color is required'),
  favoriteQuote: Yup.string().required('Favorite quote is required'),
});

const ProfileForm = ({profile}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <Formik
          initialValues={{
            birthday: '',
            favoriteColor: '',
            favoriteQuote: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Submit form values to your backend
            values.email = localStorage.getItem("userToken");
            console.log(values)
            axios.post('http://localhost:3001/profile', values)
              .then(response => {
                alert('Profile updated successfully!');
              })
              .catch(error => {
                console.error('Profile update failed:', error);
                // Handle error
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 text-black">
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
                <Field type="date" name="birthday" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="birthday" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label htmlFor="favoriteColor" className="block text-sm font-medium text-gray-700">Favorite Color</label>
                <Field as="select" name="favoriteColor" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="">Select a color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                </Field>
                <ErrorMessage name="favoriteColor" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label htmlFor="favoriteQuote" className="block text-sm font-medium text-gray-700">Favorite Quote</label>
                <Field as="textarea" name="favoriteQuote" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                <ErrorMessage name="favoriteQuote" component="div" className="text-red-500 text-xs" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
