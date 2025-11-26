"use client";

import Image from "next/image";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateCourse from "@/components/UpdateCourse/UpdateCourse";

const MyPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/myPost?email=mdriyazakonda@gmail.com`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/courses/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            setData((prevData) =>
              prevData.filter((course) => course._id !== id)
            );
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        });
      }
    });
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-24 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 mb-6 min-h-[56vh]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-blue-600">
        My All Posts
      </h2>

      <div className="overflow-x-auto w-full shadow-md rounded-lg">
        <table className="min-w-full text-sm md:text-base border border-gray-200">
          <thead className="bg-linear-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-center text-nowrap">Image</th>
              <th className="px-4 py-3 text-center text-nowrap">Course Title</th>
              <th className="px-4 py-3 text-center text-nowrap">Instructor</th>
              <th className="px-4 py-3 text-center text-nowrap">Category</th>
              <th className="px-4 py-3 text-center text-nowrap">Price</th>
              <th className="px-4 py-3 text-center text-nowrap">Publish Date</th>
              <th className="px-4 py-3 text-center text-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white text-gray-800">
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No posts found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 text-center text-nowrap">
                    <Image
                      className="rounded-full w-12 h-12 object-cover mx-auto"
                      src={item.image}
                      width={50}
                      height={50}
                      alt={item.title}
                    />
                  </td>
                  <td className="px-4 py-2 text-center text-nowrap font-medium">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 text-center text-nowrap">{item.instructor}</td>
                  <td className="px-4 py-2 text-center text-nowrap">{item.category}</td>
                  <td className="px-4 py-2 text-center text-nowrap">${item.price}</td>
                  <td className="px-4 py-2 text-center text-nowrap">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center text-nowrap">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-5xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <UpdateCourse
              course={editItem}
              onCancel={() => setIsModalOpen(false)}
              onSave={(updatedCourse) => {
                setData((prev) =>
                  prev.map((item) =>
                    item._id === updatedCourse._id ? updatedCourse : item
                  )
                );
                setIsModalOpen(false); // close modal after saving
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
