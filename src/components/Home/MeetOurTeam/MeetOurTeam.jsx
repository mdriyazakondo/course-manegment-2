"use client";

import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Md Anisul Islam",
    role: "Full-Stack Developer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGzuBbNsyNicOBxJv8E9UoGcbHJ_CkDypoag&s",
  },
  {
    name: "Md Mamun Islam",
    role: "UI/UX Designer",
    image:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
  },
  {
    name: "Michael Smith",
    role: "Backend Engineer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_nVBEMC5N5DO-PAlpiUfXtkYEKyl08t82nQ&s",
  },
  {
    name: "Emma Wilson",
    role: "Project Manager",
    image:
      "https://webusupload.apowersoft.info/gitmind/wp-content/uploads/2022/10/how-to-become-project-manager.jpg",
  },
];

export default function MeetOurTeam() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-[1500px] mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-purple-800">
          Meet Our Team
        </h2>
        <p className="text-purple-600 mt-4 max-w-2xl mx-auto">
          Our expert team is dedicated to delivering high-quality work and
          helping you achieve success.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* FIXED IMAGE */}
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {member.name}
              </h3>
              <p className="text-purple-600 font-medium">{member.role}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-4 text-gray-600">
                <FaFacebookF className="hover:text-blue-600 cursor-pointer transition" />
                <FaTwitter className="hover:text-blue-400 cursor-pointer transition" />
                <FaLinkedinIn className="hover:text-blue-700 cursor-pointer transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
