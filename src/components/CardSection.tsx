"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card';
import axios from 'axios';
import { URL } from '@/utils/constants';
import { Book } from '@/types/Book';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function CardSection() {
    const [ bookData, setBookData ] = useState<Book[]>([]);
    const router = useRouter();

    const getData = async() => {
        const response = await axios.get(`${URL}/api/books`,{ withCredentials: true });
        console.log("🚀 ~ getData ~ response:", response)
        setBookData(response?.data?.data);
    }

    useEffect(() => {
        getData();
    },[]);

    const handleDelete = async( id: string ) => {
      try{
        console.log(id, "reached in the handle delete");
        if (!window.confirm('Are you sure you want to delete this book?')) {
          return;
      }
        const response = await axios.delete(`${URL}/api/books/${id}`, { withCredentials: true });
        setBookData(prevBooks => prevBooks.filter(book => book._id !== id));  
        toast.success("book deleted succesfully")      
      }catch(error){
        console.log(error);
      }
    }

    const handleEdit = async( book:Book ) => {
      console.log("🚀 ~ handleEdit ~ book:", book)
      try{
        console.log(book,"in the handle edit option");
        router.push(`/edit/${book._id}`)
      }catch(error){
        console.log(error);
        
      }
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookData.map((book) => (
          <Card 
          key={book._id} 
          book={book} 
          onDelete={handleDelete}
          onEdit={handleEdit}/>
        ))}
      </div>
  )
}

export default CardSection