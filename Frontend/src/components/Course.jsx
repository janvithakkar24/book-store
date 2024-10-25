import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-12 mb-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque,
          eligendi inventore! Debitis, exercitationem? Similique iusto ad vitae
          minus, perferendis, rerum illum veniam et laboriosam porro consectetur
          tempora sapiente molestias nemo.
        </p>
        <Link
          to="/"
          className="bg-pink-500 text-white rounded-md px-4 py-2 mt-6"
        >
          Back
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {book.map((data) => (
          <Cards item={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}

export default Course;
