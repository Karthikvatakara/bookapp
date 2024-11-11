"use client"
import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomSingleFileImage from '@/components/ImageUploadFile';
import toast from 'react-hot-toast';
import axios from 'axios';

import { URL } from '@/utils/constants';
import { BookValidationSchema } from '@/schemas/BookValidationSchema';
import { useRouter } from 'next/navigation';

// Initial form values interface
interface BookFormValues {
    title: string;
    author: string;
    publicationYear: string;
    isbn: string;
    description: string;
    thumbnail: string;
}

const BookForm: React.FC = () => {
    //   const [ resetImage, setResetImage ] = useState(false);
      const router = useRouter();

    const initialValues: BookFormValues = {
        title: '',
        author: '',
        publicationYear: '',
        isbn: '',
        description: '',
        thumbnail: ''
    };

  
    const handleSubmit = async (
        values: BookFormValues, 
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Prepare data for submission
            const bookData = {
              ...values,
              publicationYear: parseInt(values.publicationYear, 10)
            };

            const response = await axios.post(`${URL}/api/books`, bookData, { withCredentials: true });

            toast.success('Book added successfully!');
            router.push("/");
            // resetForm();
            // setResetImage(true);
            // setTimeout(() => setResetImage(false),100); 
        } catch (error) {
            if(axios.isAxiosError(error)) {
              if(error.response?.status === 400 || error.response?.status === 409 ) {
                toast.error(error?.response?.data?.message || "validation error occured");
                return;
              }
              // toast.error(error?.response?.data?.message)
            }else{
              toast.error('submission error')
            }
            console.error('submission error')
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {/* <Toaster position="top-center" /> */}
            
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Add New Book
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={BookValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ 
                    isSubmitting, 
                    setFieldValue, 
                    values, 
                    resetForm 
                }) => (
                    <Form className="space-y-6">
                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Book Thumbnail
                            </label>
                            <CustomSingleFileImage
                                onChange={(file) => {
                                    // If file is a string (URL), set it directly
                                    if (typeof file === 'string') {
                                        setFieldValue('thumbnail', file);
                                    }
                                }}
                                initialValue={values.thumbnail}
                                // reset ={resetImage}
                            />
                            <ErrorMessage 
                                name="thumbnail" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <Field 
                                type="text" 
                                name="title" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter book title"
                            />
                            <ErrorMessage 
                                name="title" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* Author Field */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <Field 
                                type="text" 
                                name="author" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter author name"
                            />
                            <ErrorMessage 
                                name="author" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* Publication Year Field */}
                        <div>
                            <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
                                Publication Year
                            </label>
                            <Field 
                                type="number" 
                                name="publicationYear" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter publication year"
                            />
                            <ErrorMessage 
                                name="publicationYear" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* ISBN Field */}
                        <div>
                            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                                ISBN
                            </label>
                            <Field 
                                type="text" 
                                name="isbn" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter ISBN"
                            />
                            <ErrorMessage 
                                name="isbn" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <Field 
                                as="textarea"
                                name="description" 
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter book description "
                            />
                            <ErrorMessage 
                                name="description" 
                                component="div" 
                                className="text-red-500 text-sm mt-1" 
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between space-x-4">
                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() => {
                                  resetForm();
                                  setFieldValue('thumbnail',null);
                                }}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Add Book'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookForm;