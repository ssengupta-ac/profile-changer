import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

// Validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs text-black">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        try {
                            const response = await axios.post('http://localhost:3001/login', values);
                            if (response.data === 'Login successful') {
                                localStorage.setItem("userToken", values.email);
                                router.push('/profile'); // Redirect to profile on success
                            } else {
                                setErrors({ general: 'Login failed. Please try again.' });
                            }
                        } catch (error) {
                            setErrors({ general: 'Your email or password is incorrect!' });
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password:
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-2" />
                            </div>
                            {errors.general && <div className="text-red-500 text-xs mt-2">{errors.general}</div>}
                            <button
                                type="submit"
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isSubmitting}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;
