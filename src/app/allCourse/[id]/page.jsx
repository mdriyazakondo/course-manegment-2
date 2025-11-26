"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [singleData, setSingleData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`/data/course.json`)
      .then((res) => res.json())
      .then((data) => setSingleData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const singleCourse = singleData.find((course) => course._id == id);

  // 🟢 FIX: If not loaded yet, show loading UI
  if (!singleCourse) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-4 md:mx-auto mt-24 mb-12 p-6 bg-white shadow-lg rounded-2xl flex items-center justify-center min-h-[54vh]">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="shrink-0 rounded-xl overflow-hidden shadow-md w-full md:w-1/2">
          <Image
            src={singleCourse.image}
            alt={singleCourse.title}
            width={410}
            height={400}
            className="object-cover w-full h-full bg-purple-400"
          />
        </div>

        {/* Course Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-purple-700 mb-4">
            {singleCourse.title}
          </h1>

          <p className="text-gray-600 mb-6">{singleCourse.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Instructor:</span>{" "}
              {singleCourse.instructor}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {singleCourse.category}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {singleCourse.duration}
            </p>
            <p>
              <span className="font-semibold">Level:</span> {singleCourse.level}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-green-600">${singleCourse.price}</span>
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(singleCourse.created_at).toLocaleDateString()}
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
