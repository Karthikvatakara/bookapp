// app/books/edit/[id]/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomSingleFileImage from '@/components/ImageUploadFile';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Book } from '@/types/Book';
import { URL } from '@/utils/constants';
import { BookValidationSchema } from '@/schemas/BookValidationSchema';

interface BookFormValues {
    title: string;
    author: string;
    publicationYear: string;
    isbn: string;
    description: string;
    thumbnail: string;
}

const EditBookPage = () => {
    const params = useParams();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [resetImage, setResetImage] = useState(false);

    // Fetch book details when component mounts
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${URL}/api/books/${params.id}`, {
                    withCredentials: true
                });
                setBook(response.data?.data);
            } catch (error) {
                console.error('Error fetching book:', error);
                toast.error('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchBook();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">Book not found</div>
            </div>
        );
    }

    // Set initial values from fetched book data
    const initialValues: BookFormValues = {
        title: book?.title || '',
        author: book?.author || '',
        publicationYear: (book?.publicationYear || '').toString(),
        isbn: book?.isbn || '',
        description: book?.description || '',
        thumbnail: book?.thumbnail || ''
    };
    const handleSubmit = async (
        values: BookFormValues,
        { setSubmitting }: any
    ) => {
        try {
            const bookData = {
                ...values,
                publicationYear: parseInt(values.publicationYear, 10)
            };

            await axios.put(
                `${URL}/api/books/${params.id}`,
                bookData,
                { withCredentials: true }
            );

            
            toast.success('Book updated successfully!');
            router.push('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400 || error.response?.status === 409) {
                    toast.error(error?.response?.data?.message || "Validation error occurred");
                    return;
                }
            }
            toast.error('Failed to update book');
            console.error('Update error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Edit Book: {book.title}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={BookValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true} // Important for loading initial data
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="space-y-6">
                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Book Thumbnail
                            </label>
                           
                            <CustomSingleFileImage
                                onChange={(file) => {
                                    if (typeof file === 'string') {
                                        setFieldValue('thumbnail', file);
                                    }
                                }}
                                initialValue={values.thumbnail}
                                reset={resetImage}
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
                                disabled={true} // or readOnly={true}
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
                                placeholder="Enter book description"
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between space-x-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Book'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditBookPage;