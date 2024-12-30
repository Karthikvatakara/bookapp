"use client";
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { URL } from '@/utils/constants';
import { Book } from '@/types/Book';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import debounce from 'lodash/debounce';
import { useDebounce } from '@/hooks/useDebounce';

interface CardSectionProps {
    searchQuery : string;
}

function CardSection({searchQuery}:CardSectionProps) {
    const [bookData, setBookData] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const debouncedSearchQuery = useDebounce(searchQuery,500)

    const getData = async(query: string = '') => {
        try {
            setIsLoading(true);
            setError(null);
            const endpoint = query 
                ? `${URL}/api/books/search?q=${query}` 
                : `${URL}/api/books`;                   
            
            const response = await axios.get(endpoint, { withCredentials: true });
            setBookData(response?.data?.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books. Please try again later.');
            toast.error('Failed to fetch books');
        } finally {
            setIsLoading(false);
        }
    }

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
        return;
    }
    getData(debouncedSearchQuery);
  },[debouncedSearchQuery]);
 


    const handleDelete = async(id: string) => {
        try {
            if(!id) {
                toast.error('Invalid book ID');
                return;
            }

            if (!window.confirm('Are you sure you want to delete this book?')) {
                return;
            }

            // setIsLoading(true);
            await axios.delete(`${URL}/api/books/${id}`, { withCredentials: true });
            setBookData(prevBooks => prevBooks.filter(book => book.id !== id));
            toast.success("Book deleted successfully");
        } catch (error) {
            console.error('Error deleting book:', error);
            toast.error('Failed to delete book');
        } 
    }

    const handleEdit = (book: Book) => {
        if (!book?.id) {
            toast.error('Invalid book data');
            return;
        }
        router.push(`/edit/${book.id}`);
    }

    return (
        <div className="container mx-auto p-4">

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : bookData.length === 0 ? (
                <div className="text-center text-gray-500 my-8">
                    {searchQuery ? 'No books found matching your search' : 'No books available'}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bookData.map((book) => (
                        <Card
                            key={book.id || `${book.title}-${book.author}-${book.publicationYear}`}
                            book={book}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardSection;