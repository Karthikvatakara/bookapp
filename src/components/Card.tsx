"use client"
import React from 'react'
import { FaBookBookmark } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa";
import { Book } from '@/types/Book';

interface CardProps {
  book: Book;
  onDelete?: (id: string) => void;
  onEdit?: (book: Book) => void;
}

const Card: React.FC<CardProps> = ({ book, onDelete, onEdit }) => {


  const handleDelete = () => {
    
    if (onDelete) {
      onDelete(book.id.toString());
    } else {
      console.error('Invalid book ID provided for deletion');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(book);
    }
  }

  return (
    <div className="h-fit mt-14 flex items-center justify-center">
      <div className="bg-white text-grey-700 w-80 flex flex-col shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
        {/* Image Section */}
        <div className="relative w-full h-48">
          <img 
            src={book?.thumbnail || 'https://via.placeholder.com/320x192'}
            className="w-full h-full object-cover"
            alt={book?.title} 
          />
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-full text-sm">
            <span>YEAR: {book?.publicationYear}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col gap-4">
          {/* Title */}
          <h1 className="text-xl font-bold text-gray-800 text-center">
            {book?.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-2 text-gray-600">
            <FaBookBookmark className="text-blue-500" />
            <span className="text-sm">
              <span className="font-semibold">Author:</span> {book?.author}
            </span>
          </div>

          {/* ISBN */}
          <div className="flex items-center gap-2 text-gray-600">
            <FaBarcode className="text-blue-500" />
            <span className="text-sm">
              <span className="font-semibold">ISBN:</span> {book?.isbn}
            </span>
          </div>

          {/* Description */}
          <div className="mt-2">
            <p className="text-sm text-gray-600 line-clamp-3">
              {book?.description || 'No description available'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button 
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FaEdit />
              <span>Edit</span>
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;