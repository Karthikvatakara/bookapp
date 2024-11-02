import * as Yup from 'yup';


export const BookValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must be less than 100 characters')
        .required('Title is required'),
    
    author: Yup.string()
        .min(2, 'Author name must be at least 2 characters')
        .max(50, 'Author name must be less than 50 characters')
        .required('Author name is required'),
    
    publicationYear: Yup.number()
        .min(1000, 'Publication year must be a valid year')
        .max(new Date().getFullYear(), 'Publication year cannot be in the future')
        .required('Publication year is required'),
    
    isbn: Yup.string()
        .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'Invalid ISBN format')
        .required('ISBN is required'),
    
    description: Yup.string()
        .min(2, 'Description  must be at least 2 characters')
        .max(500, 'Description must be less than 500 characters')
        .required('Description is required'),
    
    thumbnail: Yup.string().required('Book thumbnail is required')
});