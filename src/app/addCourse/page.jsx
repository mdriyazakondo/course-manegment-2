"use client";
import ProtectRoute from "@/components/ProtectRoute";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { openSignIn } = useClerk();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const title = e.target.title.value;
    const category = e.target.category.value;
    const instructor = e.target.instructor.value;
    const duration = e.target.duration.value;
    const level = e.target.level.value;
    const price = e.target.price.value;
    const image = e.target.image.value;
    const description = e.target.description.value;

    const newCourse = {
      name,
      email,
      title,
      category,
      instructor,
      duration,
      level,
      price,
      image,
      description,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const data = await response.json();
      console.log("Course added:", data);
      e.target.reset();

      Swal.fire({
        icon: "success",
        title: "Course Added!",
        text: "Your course has been added successfully.",
        confirmButtonColor: "#6b21a8",
      });
    } catch (error) {
      console.error("Error adding course:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong while adding the course.",
        confirmButtonColor: "#6b21a8",
      });
    }
  };

  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [loading, user]);

  if (!user) {
    if (loading) {
      return <h4>Loading</h4>;
    }
    openSignIn();
    return <ProtectRoute />;
  }

  return (
    <div className="mt-24 bg-gray-50 min-h-screen flex flex-col items-center px-4">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Add a New Course
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            defaultValue={user?.username}
            required
            placeholder="Owner Name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            defaultValue={user?.emailAddresses[0].emailAddress}
            required
            placeholder="Owner Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="instructor"
            placeholder="Instructor"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 6 weeks)"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="level"
            placeholder="Level (Beginner, Intermediate, Advanced)"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="description"
          required
          placeholder="Course Description"
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <button type="submit" className="w-full gradient-btn">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
