"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course details");
        const data = await res.json();
        setSingleData(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">Loading course details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  // No data found
  if (!singleData || Object.keys(singleData).length === 0) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-4 md:mx-auto mt-24 mb-12 p-6 bg-white shadow-lg rounded-2xl flex items-center justify-center min-h-[54vh]">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="shrink-0 rounded-xl overflow-hidden shadow-md w-full md:w-1/2">
          <Image
            src={singleData.image}
            alt={singleData.title || "Course Image"}
            width={410}
            height={400}
            className="object-cover w-full h-full bg-purple-400"
          />
        </div>

        {/* Course Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-purple-700 mb-4">
            {singleData.title || "Untitled Course"}
          </h1>

          <p className="text-gray-600 mb-6">
            {singleData.description || "No description available."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Instructor:</span>{" "}
              {singleData.instructor || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {singleData.category || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {singleData.duration || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Level:</span>{" "}
              {singleData.level || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-green-600">${singleData.price || "0"}</span>
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {singleData.created_at
                ? new Date(singleData.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <button className="w-full py-2 flex items-center justify-center gradient-btn mt-4">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
