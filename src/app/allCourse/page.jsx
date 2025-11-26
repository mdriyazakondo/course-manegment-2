"use client";
import { useEffect, useState } from "react";
import CourseCard from "@/components/shared/CourseCard";

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");
  const [sortPrice, setSortPrice] = useState("normal");

  // Map frontend sort value to backend sort query
  const getSortValue = (value) => {
    if (value === "low-high") return "asc";
    if (value === "high-low") return "desc";
    return "normal";
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `https://server-pi-mocha.vercel.app/api/courses?search=${encodeURIComponent(
            searchCourse
          )}&sort=${getSortValue(sortPrice)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [searchCourse, sortPrice]);

  return (
    <div className="max-w-[1500px] mx-5 md:mx-6 2xl:mx-auto py-12 mt-16 md:mt-18">
      <h1 className="text-center font-bold text-4xl text-purple-500">
        Features Course
      </h1>

      <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md mt-6">
        <div>
          <input
            type="text"
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
          >
            <option value="normal" className="text-gray-600">
              Sort By Price
            </option>
            <option value="low-high" className="text-gray-600">
              Low to High
            </option>
            <option value="high-low" className="text-gray-600">
              High to Low
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
