"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGoogle,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-10 grid md:grid-cols-2 gap-8">
        {/* Left side - Contact info */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl font-extrabold text-blue-700">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg">
            We’d love to hear from you! Whether you have questions, feedback, or
            want to collaborate on an exciting project, fill out the form or
            connect with us through our social platforms.
          </p>

          <div className="flex flex-col gap-3 text-gray-700">
            <p>
              <strong>Email:</strong> coursemanager@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +880 1318-246854
            </p>
            <p>
              <strong>Address:</strong> Sadullaput,Gaibandha,Rangpur
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-all"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-blue-400 p-3 rounded-full text-white hover:bg-blue-500 transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-800 transition-all"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-600 transition-all"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-all"
            >
              <FaGoogle />
            </a>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 bg-purple-50 p-6 rounded-2xl shadow-inner"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="border border-purple-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <button type="submit" className="gradient-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
