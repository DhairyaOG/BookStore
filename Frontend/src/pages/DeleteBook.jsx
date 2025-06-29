import React, { useState } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    console.log("Deleting book with ID:", id); // For debug

    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.error("Delete error:", error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl mb-6 text-center'>
          Are you sure you want to delete this book?
        </h3>
        <button
          className='p-4 bg-red-600 text-white w-full hover:bg-red-700 transition'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
        <button
          className='p-4 bg-gray-400 text-white w-full mt-4 hover:bg-gray-500 transition'
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
