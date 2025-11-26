"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateCourse = ({ course, onCancel, onSave }) => {
  const [formData, setFormData] = useState(course || {});

  useEffect(() => {
    setFormData(course);
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${course._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      onSave(formData);
      onCancel();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Course updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Update Course
      </h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={formData?.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="category"
            value={formData?.category || ""}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="instructor"
            value={formData?.instructor || ""}
            onChange={handleChange}
            placeholder="Instructor"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="duration"
            value={formData?.duration || ""}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="level"
            value={formData?.level || ""}
            onChange={handleChange}
            placeholder="Level"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="price"
            type="number"
            value={formData?.price || ""}
            onChange={handleChange}
            placeholder="Price ($)"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <input
          name="image"
          value={formData?.image || ""}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="description"
          value={formData?.description || ""}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 p-4 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Cancel
          </button>
          <button type="submit" className="flex-1 gradient-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
